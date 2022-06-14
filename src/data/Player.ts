import { makeAutoObservable } from "mobx";
import type { Game } from "./Game";

export class Player {
    public x = 0;
    public z = 0;
    public angle = Math.PI;
    public speed = 1;
    public targetX: number | null = null;
    public targetZ: number | null = null;
    public animation = "Idle";

    public constructor(private game: Game) {
        this.setTarget = this.setTarget.bind(this);
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

        if (
            this.game.autoFight &&
            this.animation === "Idle" &&
            this.game.enemies.length
        ) {
            this.setTarget(this.game.enemies[0].x, this.game.enemies[0].z);
        }

        const targetX = this.targetX || this.x;
        const targetZ = this.targetZ || this.z;

        const dx = targetX - this.x;
        const dz = targetZ - this.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance > 0.3) {
            this.animation = "Run";
            this.x += Math.sin(this.angle) * (this.speed / dTime);
            this.z += Math.cos(this.angle) * (this.speed / dTime);
        } else {
            this.animation = "Idle";
            this.targetX = null;
            this.targetZ = null;
        }

        return [this.x, this.z];
    }
}
