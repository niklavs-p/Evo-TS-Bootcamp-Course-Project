import {
    Mesh,
    Scene,
    AnimationRange,
    Skeleton,
    AnimationPropertiesOverride,
    Vector3,
    StandardMaterial,
    Color3,
} from "@babylonjs/core";
import { Enemy } from "../../../../data/Enemy";

const PlayerAnimation = {
    Idle: { name: "Idle", value: "YBot_Idle" },
    Walk: { name: "Walk", value: "YBot_Walk" },
    Run: { name: "Run", value: "YBot_Run" },
};

export class GameEnemy extends Mesh {
    private skin: Mesh;
    private currentAnimation = PlayerAnimation.Idle;

    public constructor(scene: Scene, protected enemies: Enemy[]) {
        super("enemy", scene);

        const ybotMesh = (scene.getMeshByName("YBot") as any).getChildren()[0];
        this.skin = ybotMesh.clone("enemy-skin");
        this.skin.skeleton = ybotMesh.skeleton.clone(
            "enemy-skeleton",
        ) as Skeleton;

        const redMaterial = new StandardMaterial("redMat", scene);
        redMaterial.diffuseColor = Color3.FromInts(255, 102, 102); // light green
        redMaterial.specularColor = Color3.Black(); // matte
        this.skin.material = redMaterial;

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
        if (this.enemies.length) {
            this.skin.isVisible = true;

            this.position = new Vector3(
                this.enemies[0].x,
                0,
                this.enemies[0].z,
            );
            this.rotation.y = this.enemies[0].angle;

            if (this.currentAnimation.name !== this.enemies[0].animation) {
                this.currentAnimation =
                    PlayerAnimation[
                        this.enemies[0]
                            .animation as keyof typeof PlayerAnimation
                    ];
                this.playAnimation(this.currentAnimation.value);
            }
        } else {
            this.skin.isVisible = false;
        }
    };

    private playAnimation = (animation: string) => {
        const animationRange = this.getAnimationRangeByName(animation);
        this.getScene().beginAnimation(
            this.skin.skeleton,
            animationRange.from,
            animationRange.to,
            true,
            0.9,
        );
    };

    private getAnimationRangeByName = (animation: string): AnimationRange => {
        return this.skin.skeleton?.getAnimationRange(
            animation,
        ) as AnimationRange;
    };
}
