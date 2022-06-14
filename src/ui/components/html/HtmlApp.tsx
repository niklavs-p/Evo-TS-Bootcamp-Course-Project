import "./HtmlApp.css";
import { useEffect, useRef } from "react";
import { Title } from "../common/Title";
import { useGame } from "../../contexts/useGame";
import { useUI } from "../../contexts/useUI";
import { HtmlPlayer } from "./HtmlPlayer";
import { HtmlEnemy } from "./HtmlEnemy";

export const HtmlApp = () => {
    const ui = useUI();
    const game = useGame();
    const htmlRootRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (e: MouseEvent) => {
        if (e.target === htmlRootRef.current) {
            const { offsetX, offsetY } = e;

            const x = offsetX / (ui.htmlApp.width / 15) - 7.5;
            const y = -offsetY / (ui.htmlApp.height / 15) + 7.5;

            game.player.setTarget(x, y);
        }
    };

    useEffect(() => {
        if (!htmlRootRef.current) return;
        const { offsetWidth, offsetHeight } = htmlRootRef.current;

        ui.htmlApp.width = offsetWidth;
        ui.htmlApp.height = offsetHeight;
        ui.htmlApp.xOffset = offsetWidth / 2;
        ui.htmlApp.yOffset = offsetHeight / 2;
    }, []);

    useEffect(() => {
        htmlRootRef.current?.addEventListener("mousedown", handleClick);

        return () => {
            htmlRootRef.current?.removeEventListener("mousedown", handleClick);
        };
    }, [htmlRootRef.current]);

    console.log("render");

    return (
        <div ref={htmlRootRef} id="htmlRoot">
            <Title text="HTML" />
            <HtmlPlayer />
            <HtmlEnemy />
        </div>
    );
};
