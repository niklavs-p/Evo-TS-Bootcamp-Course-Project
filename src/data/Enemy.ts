import { makeAutoObservable } from "mobx";
import type { Game } from "./Game";

export class Enemy {
    public x = -2;
    public z = -2;
    public angle = Math.PI;
    public speed = 0.4;
    public targetX = -2;
    public targetZ = -2;
    public animation = "Idle";

    public constructor(x: number, z: number, private game: Game) {
        this.x = x;
        this.z = z;

        makeAutoObservable(this);
    }

    public setTarget(x: number, z: number) {
        const dx = x - this.x;
        const dz = z - this.z;

        const angle = Math.atan2(dx, dz);

        this.targetX = x;
        this.targetZ = z;
        this.angle = angle;
    }

    public setAngle(angle: number) {
        this.angle = angle;
    }

    public update(dTime: number) {
        if (!dTime) return;

        this.setTarget(this.game.player.x, this.game.player.z);

        const dx = this.targetX - this.x;
        const dz = this.targetZ - this.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance > 0.3) {
            this.animation = "Walk";
            this.x += Math.sin(this.angle) * (this.speed / dTime);
            this.z += Math.cos(this.angle) * (this.speed / dTime);
        } else {
            this.game.score++;
            this.game.enemies.splice(this.game.enemies.indexOf(this), 1);

            setTimeout(() => {
                const x = Math.random() * 10 - 5;
                const z = Math.random() * 10 - 5;
                this.game.enemies.push(new Enemy(x, z, this.game));
            }, 1000);
        }

        return [this.x, this.z];
    }
}
