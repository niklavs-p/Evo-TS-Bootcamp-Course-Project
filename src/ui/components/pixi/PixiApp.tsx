import { useEffect, useRef } from "react";
import { Title } from "../common/Title";
import { useGame } from "../../contexts/useGame";
import "./PixiApp.css";
import { PixiGame } from "./PixiGame";

export const PixiApp = () => {
    const game = useGame();
    const pixiGame = useRef<PixiGame | null>(null);

    useEffect(() => {
        pixiGame.current = new PixiGame(game);
        return () => {
            pixiGame.current?.cleanup();
        };
    }, []);

    return (
        <div id="pixiRoot">
            <Title text="PixiJS" />
            <canvas id="pixiCanvas" touch-action="none" />
        </div>
    );
};
