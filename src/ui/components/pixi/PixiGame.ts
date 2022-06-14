import * as PIXI from "pixi.js";
import { Game } from "../../../data/Game";
import { PixiPlayer } from "./PixiPlayer";
import { PixiEnemy } from "./PixiEnemy";

import grass from "/static/grass.png";
import player from "/static/player.png";
import enemy from "/static/enemy.png";

export class PixiGame {
    protected canvas: HTMLCanvasElement;
    public app: PIXI.Application;
    protected bg: PIXI.SimplePlane;
    protected player: PixiPlayer;
    protected enemy: PixiEnemy;

    protected throttledResizeId: ReturnType<typeof setTimeout>;

    constructor(protected game: Game) {
        this.canvas = document.getElementById(
            "pixiCanvas",
        ) as HTMLCanvasElement;
        this.app = new PIXI.Application({
            view: this.canvas,
            resizeTo: document.getElementById("pixiRoot")!,
            backgroundColor: 0x1099bb,
            // resolution: window.devicePixelRatio || 1,
        });

        this.preloadTextures();
    }

    preloadTextures = () => {
        this.app.loader.add("grass", grass);
        this.app.loader.add("enemy", enemy);
        this.app.loader.add("player", player);

        this.app.loader.onComplete.add(this.doneLoading);

        this.app.loader.load();
    };

    doneLoading = () => {
        const texture = this.app.loader.resources.grass.texture as PIXI.Texture;
        this.bg = new PIXI.SimplePlane(texture);
        this.bg.width = this.app.screen.width;
        this.bg.height = this.app.screen.height;

        this.enemy = new PixiEnemy(this);
        this.player = new PixiPlayer(this);

        this.app.stage.addChild(this.bg);
        this.app.stage.addChild(this.enemy.skin);
        this.app.stage.addChild(this.player.skin);

        this.handleClick = this.handleClick.bind(this);
        this.canvas.addEventListener("mousedown", this.handleClick);

        this.resize = this.resize.bind(this);
        window.addEventListener("resize", this.throttledResize);
        this.resize();

        this.app.ticker.add(this.update);
    };

    getDirection = () => {
        const radians = this.game.player.angle;

        //return up, down, left, right
        switch (true) {
            case radians > -1.047 && radians < -2.094:
                return "up";
            case radians >= -2.094 &&
                radians <= -Math.PI &&
                radians >= 2.094 &&
                radians <= Math.PI:
                return "left";
            case radians > 1.047 && radians < 2.094:
                return "down";
            case radians <= 1.047 && radians >= -1.047:
                return "right";
            default:
                return "down";
        }
    };

    update = () => {
        const widthOffset = this.canvas.width / 2;
        const heightOffset = this.canvas.height / 2;

        this.player.skin.x =
            (this.game.player.x * this.canvas.width) / 30 + widthOffset;
        this.player.skin.y =
            (-this.game.player.z * this.canvas.width) / 30 + heightOffset;

        // console.log(this.game.player.angle, this.getDirection());

        if (this.game.player.animation === "Run" && !this.player.skin.playing) {
            this.player.skin.textures = this.player.playerSheet.moveSouth;
            this.player.skin.play();
        } else if (this.game.player.animation === "Idle") {
            this.player.skin.textures = this.player.playerSheet.standSouth;
            // this.player.skin.play();
        }

        if (this.game.enemies.length) {
            this.enemy.skin.visible = true;
            this.enemy.skin.x =
                (this.game.enemies[0].x * this.canvas.width) / 30 + widthOffset;
            this.enemy.skin.y =
                (-this.game.enemies[0].z * this.canvas.width) / 30 +
                heightOffset;
        } else {
            this.enemy.skin.visible = false;
        }
    };

    handleClick = (e: MouseEvent) => {
        const { offsetX, offsetY } = e;
        const x = offsetX / (this.canvas.width / 30) - 15;
        const y = -offsetY / (this.canvas.height / 30) + 15;

        this.game.player.setTarget(x, y);
    };

    resize = () => {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.app.renderer.resize(width, height);
        this.bg.width = width;
        this.bg.height = height;
    };

    throttledResize = () => {
        clearTimeout(this.throttledResizeId);
        this.throttledResizeId = setTimeout(this.resize, 100);
    };

    cleanup = () => {
        this.canvas.removeEventListener("mousedown", this.handleClick);
        window.removeEventListener("resize", this.throttledResize);
        this.app.destroy(true);
    };
}
