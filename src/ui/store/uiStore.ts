import { makeAutoObservable } from "mobx";

export const uiStore = makeAutoObservable({
    dataUI: true,
    babylon: false,
    pixi: true,
    html: true,

    htmlApp: {
        width: 0,
        height: 0,
        xOffset: 0,
        yOffset: 0,
    },
});

export type uiStoreType = typeof uiStore;
