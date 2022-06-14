import "./App.css";
import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Game } from "../data/Game";
import { GameContext } from "./contexts/useGame";
import { Header } from "./components/header/Header";
import { Container } from "./components/Container";
import { uiStore } from "./store/uiStore";
import { UIContext } from "./contexts/useUI";

export const App = observer(() => {
    const game = useMemo(() => new Game(), []);
    const ui = useMemo(() => uiStore, []);

    return (
        <GameContext.Provider value={game}>
            <UIContext.Provider value={ui}>
                <Header />
                <Container />
            </UIContext.Provider>
        </GameContext.Provider>
    );
});
