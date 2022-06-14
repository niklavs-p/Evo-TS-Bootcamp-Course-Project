import * as React from "react";
import type { uiStoreType } from "../store/uiStore";

export const UIContext = React.createContext<uiStoreType | null>(null);

export function useUI(): uiStoreType {
    const ui = React.useContext(UIContext);
    if (!ui) {
        throw new Error("ui should be provided");
    }
    return ui;
}
