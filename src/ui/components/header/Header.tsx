import "./Header.css";
import { Btn } from "./Btn";

export const Header = () => {
    return (
        <div className="header">
            <div className="logo">Idle RPG Game</div>
            <div className="uis">
                <Btn name="dataUI" text="UI" />
                <Btn name="babylon" text="BabylonJS" />
                <Btn name="pixi" text="PixiJS" />
                <Btn name="html" text="HTML" />
            </div>
        </div>
    );
};
