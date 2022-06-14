import "./DataUI.css";
import { Title } from "../common/Title";
import { JsonTree } from "./JsonTree";
import { AutoFightBtn } from "./AutoFightBtn";

export const DataUI = () => {
    return (
        <div id="mobxRoot" className="cell store">
            <Title text="MobX" />
            <AutoFightBtn />
            <JsonTree />
        </div>
    );
};
