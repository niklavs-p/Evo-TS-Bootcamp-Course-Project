import {
    Mesh,
    Scene,
    AnimationRange,
    Skeleton,
    AnimationPropertiesOverride,
    Vector3,
} from "@babylonjs/core";
import { Player } from "../../../../data/Player";

const PlayerAnimation = {
    Idle: { name: "Idle", value: "YBot_Idle" },
    Walk: { name: "Walk", value: "YBot_Walk" },
    Run: { name: "Run", value: "YBot_Run" },
};

export class GamePlayer extends Mesh {
    private skin: Mesh;
    private currentAnimation = PlayerAnimation.Idle;

    public constructor(scene: Scene, protected player: Player) {
        super("player", scene);

        const ybotMesh = (scene.getMeshByName("YBot") as any).getChildren()[0];
        this.skin = ybotMesh.clone("player-skin");
        this.skin.skeleton = ybotMesh.skeleton.clone(
            "player-skeleton",
        ) as Skeleton;

        this.skin.setParent(this);
        this.skin.position.set(0, 0, 0);
        this.skin.isVisible = true;
        this.rotation.y = Math.PI;

        this.playAnimation(this.currentAnimation.value);
        this.skin.skeleton.animationPropertiesOverride =
            new AnimationPropertiesOverride();
        this.skin.skeleton.animationPropertiesOverride.enableBlending = true;
        this.skin.skeleton.animationPropertiesOverride.blendingSpeed = 0.1;

        scene.onBeforeRenderObservable.add(this.onFrame);
    }

    private onFrame = () => {
        this.onMove();
    };

    private onMove = () => {
        this.position = new Vector3(this.player.x, 0, this.player.z);
        this.rotation.y = this.player.angle;

        if (this.currentAnimation.name !== this.player.animation) {
            this.currentAnimation =
                PlayerAnimation[
                    this.player.animation as keyof typeof PlayerAnimation
                ];
            this.playAnimation(this.currentAnimation.value);
        }
    };

    private playAnimation = (animation: string) => {
        const animationRange = this.getAnimationRangeByName(animation);
        this.getScene().beginAnimation(
            this.skin.skeleton,
            animationRange.from,
            animationRange.to,
            true,
        );
    };

    private getAnimationRangeByName = (animation: string): AnimationRange => {
        return this.skin.skeleton?.getAnimationRange(
            animation,
        ) as AnimationRange;
    };
}
