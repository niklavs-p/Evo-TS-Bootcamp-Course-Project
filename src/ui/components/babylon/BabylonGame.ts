import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import { GameBase } from "./common/GameBase";
import {
    AssetsManager,
    DirectionalLight,
    HemisphericLight,
    InstancedMesh,
    Scene,
    Vector3,
} from "@babylonjs/core";
import { GamePlayer } from "./components/GamePlayer";
import { Model, TextureId } from "./consts";
import { GameMap } from "./components/GameMap";
import { GameEnemy } from "./components/GameEnemy";

export class BabylonGame extends GameBase {
    protected addContent(): void {
        this.boot().then(() => {
            // this.scene.debugLayer.show();

            // map
            const map = new GameMap(this.scene);

            // player
            const player = new GamePlayer(this.scene, this.game.player);

            // enemy
            const enemy = new GameEnemy(this.scene, this.game.enemies);
        });
    }

    private boot(): Promise<void> {
        const assetManager = new AssetsManager(this.scene);
        const dummyTask = assetManager.addMeshTask(
            "load-dummy",
            "",
            "https://www.babylonjs-playground.com/scenes/dummy3.babylon",
            "",
        );
        assetManager.addCubeTextureTask("load-skybox", TextureId.Skybox);
        assetManager.addTextureTask("load-ground", TextureId.Ground);
        assetManager.addTextureTask("load-wall", TextureId.Wall);
        assetManager.addTextureTask("load-decal", TextureId.Decal);
        assetManager.addTextureTask("load-normal-map", TextureId.NormalMapWall);

        dummyTask.onSuccess = (task) => {
            const mesh: any = task.loadedMeshes[0];
            mesh.isVisible = false;
            // const player: InstancedMesh = mesh.createInstance("player");
            // const enemy: InstancedMesh = mesh.createInstance("enemy");
        };

        return assetManager.loadAsync();
    }

    protected createLight = (scene: Scene): void => {
        const evnLight = new HemisphericLight(
            "evnLight",
            new Vector3(0, 1, 0),
            scene,
        );
        evnLight.intensity = 0.7;
        // const directionalLight = new DirectionalLight(
        //     "light",
        //     new Vector3(-1, -2, -2),
        //     scene,
        // );
        // directionalLight.position.y = 40;
    };
}
