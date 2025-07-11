import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Game, Settings } from "./components";
import { loadDefaultSpec } from "./lib";

const App = () => {
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [gameSpec, setGameSpec] = useState(loadDefaultSpec());

  const handleClose = (doReset) => {
    setShowModal(false);
    if (doReset)
      window.location.reload();
  }

  return (
    <>
      <div id="app">
        {!showSettings && (
          <div id="menu">
            <Button 
              variant="outline-secondary"
              onClick={() => setShowSettings(true)}
            >
              Settings
            </Button>
            <Button variant="outline-secondary"
              onClick={() => setShowModal(true)}
            >
              Restart
            </Button>
          </div>
        )}
        <div id="main">
          {showSettings ? (
            <Settings
              whenClosed={() => setShowSettings(false)}
              setGameSpec={setGameSpec}
            />
          ) : (
            <Game 
              error={error}
              setError={setError}
              gameSpec={gameSpec}
            />
          )}
        </div>
      </div>
      <Modal show={showModal}> 
        <Modal.Header>
          <Modal.Title>Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Restart from the beginning?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handleClose(true)}>
            Restart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;