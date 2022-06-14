import * as PIXI from "pixi.js";
import type { PixiGame } from "./PixiGame";

export class PixiPlayer {
    public playerSheet: Record<string, PIXI.Texture[]> = {};
    public skin: PIXI.AnimatedSprite;
    constructor(public pixiGame: PixiGame) {
        this.createPlayerSheet();
        this.createPlayer();
    }

    createPlayerSheet = () => {
        let ssheet = PIXI.BaseTexture.from(
            this.pixiGame.app.loader.resources.player.url,
        );
        let w = 48;
        let h = 48;

        this.playerSheet["standSouth"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, w, h)),
        ];
        this.playerSheet["standWest"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        ];
        this.playerSheet["standNorth"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        ];
        this.playerSheet["standEast"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        ];

        this.playerSheet["moveSouth"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 1 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 3 * h, w, h)),
        ];
        this.playerSheet["moveWest"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 1 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 3 * h, w, h)),
        ];
        this.playerSheet["moveNorth"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 1 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 3 * h, w, h)),
        ];
        this.playerSheet["moveEast"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 1 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 3 * h, w, h)),
        ];
    };

    createPlayer = () => {
        this.skin = new PIXI.AnimatedSprite(this.playerSheet.standSouth);
        this.skin.anchor.set(0.5);
        this.skin.scale = new PIXI.Point(2, 2);
        this.skin.animationSpeed = 0.1;
        this.skin.loop = false;
        this.skin.x = this.pixiGame.app.screen.width / 2;
        this.skin.y = this.pixiGame.app.screen.height / 2;
        this.skin.play();
    };
}
