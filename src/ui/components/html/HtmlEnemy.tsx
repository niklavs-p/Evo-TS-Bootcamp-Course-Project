import { observer } from "mobx-react-lite";
import { useGame } from "../../contexts/useGame";
import { useUI } from "../../contexts/useUI";

export const HtmlEnemy = observer(() => {
    const game = useGame();
    const ui = useUI();

    if (game.enemies.length) {
        return (
            <div
                className="enemy"
                style={{
                    left:
                        (game.enemies[0].x * ui.htmlApp.width) / 15 +
                        ui.htmlApp.xOffset -
                        25 +
                        "px",
                    top:
                        (-game.enemies[0].z * ui.htmlApp.height) / 15 +
                        ui.htmlApp.yOffset -
                        25 +
                        "px",
                }}
            ></div>
        );
    }

    return null;
});
