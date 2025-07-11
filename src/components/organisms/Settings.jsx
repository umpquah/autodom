import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const Settings = ({ whenClosed, setGameSpec }) => {
  const [nsfw, setNsfw] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [modal, setModal] = useState(null);

  const showModal = (action) => {
    if (action === "save") {
      setModal({
        prompt: "Save changes?",
        confirmAnswer: "Save",
        cancelAnswer: "Cancel",
      })
    } else if (action === "exit") {
      if (dirty) {
        setModal({
          prompt: "Exit without saving?",
          confirmAnswer: "Yes, abandon changes",
          cancelAnswer: "Cancel",
        });
      } else {
        whenClosed();
      }
    }
  };

  const handleConfirmed = () => {
    const { confirmAnswer } = modal;
    setModal(null);
    if (confirmAnswer === "Save") {
      setDirty(false);
    } else {
      setDirty(false);
      whenClosed();
    }
  };

  return (
    <>
      <div id="settings">
        <div className="header">
          <Button
            variant="success"
            onClick={() => showModal("exit")}
          >
            Back
          </Button>
          <div className="title">
            Settings
          </div>
            <Button
              variant="success"
              disabled={!dirty}
              onClick={() => showModal("save")}
            >
              Save
            </Button>
        </div>
        <Form>
          <div className="content">
            <div className="category">Basic</div>
            <Form.Check 
              type="switch"
              checked={nsfw}
              onChange={(e) => {
                setNsfw(e.target.checked);
                setDirty(true);
              }}
            />
        </div>
        </Form>
      </div>
      <Modal show={!!modal}> 
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal?.prompt}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleConfirmed}>
            {modal?.confirmAnswer}
          </Button>
          <Button variant="secondary" onClick={() => setModal(null)}>
            {modal?.cancelAnswer}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Settings;