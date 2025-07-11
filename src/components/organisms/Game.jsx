import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { GameStateManager } from "../../model";

import Stage from "../molecules/Stage";

function Game({ gameSpec, error, setError }) {
    const [manager, setManager] = useState(null);
    const [visibleStages, setVisibleStages] = useState([]);
    const [round, setRound] = useState(1);

    useEffect(() => {
      const load = async () => {
          if (gameSpec) {
            try {
              const m = new GameStateManager(gameSpec);
              setManager(m);
            } catch (err) {
              setError(err.message);
            }
          }
        };
      load();
    }, [gameSpec, setError]);

    useEffect(() => {
        if (manager) {
            setVisibleStages([manager.state]);
        }
    }, [manager]);

    const advance = () => {
      console.log("Advancing stage");
      const { resolution: { clearStages } } = manager.state;
      const nextState = manager.advance();
      if (clearStages) {
        setRound(round + 1);
        setVisibleStages([nextState]);
      } else {
        setVisibleStages((prev) => [...prev, nextState]);
      }
    };

    const shownStages = error ? visibleStages.slice(0, -1) : visibleStages;

    return (
      <>
        <div id="game">
          {shownStages.map((stage, idx) => (
            <Stage 
              key={`${round}.${idx}`}
              disabled={!!error}
              whenStageDone={advance}
              setError={setError}
              {...stage}
            />
          ))}
        </div>
        <div className="error-display">
          {error && 
            <Alert variant="danger" dismissible>
            {error}
            </Alert>
          }
        </div>
      </>
    )
}

export default Game;


