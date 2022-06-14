import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { configure, makeAutoObservable } from "mobx";

configure({
    enforceActions: "never",
});

export class Game {
    public fps = 60;
    public lastTime = new Date().getTime();

    public player: Player;
    public enemies: Enemy[] = [];

    public score = 0;

    public autoFight: boolean = true;

    public constructor() {
        this.player = new Player(this);
        this.enemies.push(new Enemy(-2, -2, this));

        this.toggleAutoFight = this.toggleAutoFight.bind(this);
        this.update = this.update.bind(this);
        // window.requestAnimationFrame(this.update);
        this.loop();

        makeAutoObservable(this);
    }

    public update() {
        const now = new Date().getTime();
        const dTime = now - this.lastTime;
        this.lastTime = now;

        this.player.update(dTime);
        this.enemies.forEach((enemy) => enemy.update(dTime));

        // window.requestAnimationFrame(this.update);
        this.loop();
    }

    public loop() {
        setTimeout(() => {
            this.update();
        }, 1000 / this.fps);
    }

    public toggleAutoFight() {
        this.autoFight = !this.autoFight;
    }
}
