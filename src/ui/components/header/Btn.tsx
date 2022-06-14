import { observer } from "mobx-react-lite";
import { useUI } from "../../contexts/useUI";

type BtnProps = {
    name: "dataUI" | "babylon" | "pixi" | "html";
    text: string;
};

export const Btn = observer(({ name, text }: BtnProps) => {
    const ui = useUI();
    return (
        <div
            className={`btn ${name}-btn ${ui[name] ? "active" : ""}`}
            onClick={() => (ui[name] = !ui[name])}
        >
            {text}
        </div>
    );
});
