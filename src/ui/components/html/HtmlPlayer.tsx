import { observer } from "mobx-react-lite";
import { useGame } from "../../contexts/useGame";
import { useUI } from "../../contexts/useUI";

export const HtmlPlayer = observer(() => {
    const game = useGame();
    const ui = useUI();

    return (
        <div
            className="player"
            style={{
                left:
                    (game.player.x * ui.htmlApp.width) / 15 +
                    ui.htmlApp.xOffset -
                    25 +
                    "px",
                top:
                    (-game.player.z * ui.htmlApp.height) / 15 +
                    ui.htmlApp.yOffset -
                    25 +
                    "px",
            }}
        ></div>
    );
});
