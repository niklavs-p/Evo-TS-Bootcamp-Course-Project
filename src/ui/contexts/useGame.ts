import * as React from "react";
import type { Game } from "../../data/Game";

export const GameContext = React.createContext<Game | null>(null);

export function useGame(): Game {
    const game = React.useContext(GameContext);
    if (!game) {
        throw new Error("game should be provided");
    }
    return game;
}
