import {
    HemisphericLight,
    Engine,
    Scene,
    Vector3,
    ArcRotateCamera,
} from "@babylonjs/core";
import type {
    IPointerEvent,
    PickingInfo,
    PointerEventTypes,
} from "@babylonjs/core";
import { Game } from "../../../../data/Game";

export abstract class GameBase {
    protected readonly engine: Engine;
    protected readonly canvas: HTMLCanvasElement;
    protected readonly scene: Scene;

    public constructor(protected game: Game) {
        this.canvas = this.createCanvas();
        this.engine = this.createEngine(this.canvas);
        this.scene = this.createScene(this.engine);
        this.createCamera(this.scene);
        this.createLight(this.scene);
        this.addContent();
        window.addEventListener("resize", this.onResize);
        this.engine.runRenderLoop(this.onRender);

        // On Click
        this.scene.onPointerDown = (
            evt: IPointerEvent,
            pickInfo: PickingInfo,
            type: PointerEventTypes,
        ): void => {
            if (!pickInfo.pickedPoint) return;

            this.game.player.setTarget(
                pickInfo.pickedPoint.x,
                pickInfo.pickedPoint.z,
            );
        };
    }
    public start = (): void => {
        this.onResize();
    };
    protected createCanvas = (): HTMLCanvasElement => {
        const canvas = document.getElementById(
            "babylonCanvas",
        ) as HTMLCanvasElement;
        return canvas;
    };
    protected createEngine = (canvas: HTMLCanvasElement): Engine => {
        return new Engine(canvas, true, {}, true);
    };
    protected createScene = (engine: Engine): Scene => {
        return new Scene(engine, {});
    };
    protected createCamera = (scene: Scene) => {
        const camera = new ArcRotateCamera(
            "camera",
            -Math.PI * 0.5,
            Math.PI * 0.25,
            12,
            Vector3.Zero(),
            scene,
        );
        // camera.attachControl();
    };
    protected createLight = (scene: Scene) => {
        const lights = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            scene,
        );
    };
    protected abstract addContent(): void;
    private onRender = () => {
        this.scene.render();
    };
    private onResize = () => {
        this.engine.resize();
    };
    public cleanup = (): void => {
        window.removeEventListener("resize", this.onResize);
        // this.scene.dispose();
        this.engine.dispose();
    };
}
