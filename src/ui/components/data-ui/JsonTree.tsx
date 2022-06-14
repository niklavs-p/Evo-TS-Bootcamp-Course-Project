import ReactJson from "react-json-view";
import { observer } from "mobx-react-lite";
import { useGame } from "../../contexts/useGame";

export const JsonTree = observer(() => {
    const game = useGame();

    return (
        <div className="json-tree">
            <ReactJson
                name="game"
                src={{
                    score: game.score,
                    autoFight: game.autoFight,
                }}
                theme="monokai"
                displayDataTypes={false}
                enableClipboard={false}
                displayObjectSize={false}
            />
            <ReactJson
                name="player"
                src={{
                    animation: game.player.animation,
                    x: Number(game.player.x.toFixed(4)),
                    y: Number(game.player.z.toFixed(4)),
                    angle: Number(game.player.angle.toFixed(4)),
                    targetX: Number(game.player.targetX?.toFixed(4)),
                    targetY: Number(game.player.targetZ?.toFixed(4)),
                }}
                theme="monokai"
                displayDataTypes={false}
                enableClipboard={false}
                displayObjectSize={false}
            />

            <ReactJson
                name="enemies"
                src={
                    game.enemies.length
                        ? [
                              {
                                  animation: game.enemies[0].animation,
                                  x: Number(game.enemies[0].x.toFixed(4)),
                                  y: Number(game.enemies[0].z.toFixed(4)),
                                  angle: Number(
                                      game.enemies[0].angle.toFixed(4),
                                  ),
                                  targetX: Number(
                                      game.enemies[0].targetX.toFixed(4),
                                  ),
                                  targetY: Number(
                                      game.enemies[0].targetZ.toFixed(4),
                                  ),
                              },
                          ]
                        : []
                }
                theme="monokai"
                displayDataTypes={false}
                enableClipboard={false}
                displayObjectSize={false}
            />
        </div>
    );
});
