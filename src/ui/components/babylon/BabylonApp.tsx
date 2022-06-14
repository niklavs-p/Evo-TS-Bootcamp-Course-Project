import { useEffect, useRef } from "react";
import { Title } from "../common/Title";
import { useGame } from "../../contexts/useGame";
import "./BabylonApp.css";
import { BabylonGame } from "./BabylonGame";

export const BabylonApp = () => {
    const game = useGame();
    const babylonGame = useRef<BabylonGame | null>(null);

    useEffect(() => {
        babylonGame.current = new BabylonGame(game);
        babylonGame.current.start();

        return () => {
            babylonGame.current?.cleanup();
        };
    }, []);

    return (
        <div id="babylonRoot">
            <Title text="BabylonJS" />
            <canvas id="babylonCanvas" touch-action="none" />
        </div>
    );
};
