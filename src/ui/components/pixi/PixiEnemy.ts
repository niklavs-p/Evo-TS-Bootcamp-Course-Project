import * as PIXI from "pixi.js";
import type { PixiGame } from "./PixiGame";

export class PixiEnemy {
    public enemySheet: Record<string, PIXI.Texture[]> = {};
    public skin: PIXI.AnimatedSprite;
    constructor(public pixiGame: PixiGame) {
        this.createEnemySheet();
        this.createEnemy();
    }

    createEnemySheet = () => {
        let ssheet = PIXI.BaseTexture.from(
            this.pixiGame.app.loader.resources.enemy.url,
        );
        let w = 64;
        let h = 64;

        this.enemySheet["standSouth"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 2 * h, w, h)),
        ];
        this.enemySheet["standWest"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 1 * h, w, h)),
        ];
        this.enemySheet["standNorth"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, w, h)),
        ];
        this.enemySheet["standEast"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 3 * h, w, h)),
        ];

        this.enemySheet["moveSouth"] = [
            new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 2 * h, w, h)),
            new PIXI.Texture(ssheet, new PIXI.Rectangle(8 * w, 2 * h, w, h)),
        ];
    };

    createEnemy = () => {
        this.skin = new PIXI.AnimatedSprite(this.enemySheet.moveSouth);
        this.skin.anchor.set(0.5);
        this.skin.scale = new PIXI.Point(1.5, 1.5);
        this.skin.animationSpeed = 0.3;
        this.skin.loop = true;
        this.skin.x = this.pixiGame.app.screen.width / 2;
        this.skin.y = this.pixiGame.app.screen.height / 2;
        this.skin.play();
    };
}
