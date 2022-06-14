import { observer } from "mobx-react-lite";
import { useUI } from "../contexts/useUI";
import { BabylonApp } from "./babylon/BabylonApp";
import { HtmlApp } from "./html/HtmlApp";
import { DataUI } from "./data-ui/DataUI";
import { PixiApp } from "./pixi/PixiApp";

export const Container = observer(() => {
    const ui = useUI();
    let cellCount = 0;
    if (ui.dataUI) cellCount++;
    if (ui.babylon) cellCount++;
    if (ui.html) cellCount++;
    if (ui.pixi) cellCount++;

    return (
        <div className={`container cell-count-${cellCount}`}>
            {ui.dataUI && (
                <div className="cell">
                    <DataUI />
                </div>
            )}
            {ui.babylon && (
                <div className="cell">
                    <BabylonApp />
                </div>
            )}
            {ui.html && (
                <div className="cell">
                    <HtmlApp />
                </div>
            )}
            {ui.pixi && (
                <div className="cell">
                    <PixiApp />
                </div>
            )}
        </div>
    );
});
