import {
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
    Texture,
    Color3,
} from "@babylonjs/core";
import { TextureId } from "../consts";

export class GameMap {
    public readonly playerStartPosition: Vector3 = new Vector3(0, 0, 0);

    public constructor(scene: Scene) {
        this.generateMap(scene);
    }
    private generateMap = (scene: Scene): void => {
        const ground = MeshBuilder.CreateGround(
            "ground",
            { width: 25, height: 25 },
            scene,
        );
        const groundMaterial = new StandardMaterial("ground-material", scene);
        groundMaterial.specularColor = new Color3(0, 0, 0);
        const groundTexture = scene.getTextureByName(
            TextureId.Ground,
        ) as Texture;
        groundTexture.uScale = 40;
        groundTexture.vScale = 40;
        groundMaterial.diffuseTexture = groundTexture;
        ground.material = groundMaterial;
    };
}
