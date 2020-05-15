import { Modal, Button, Form } from 'react-bootstrap';
import { SETS_CHANGE, LENGTH_CHANGE, GENERATE } from '../../utils/actions'
import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";

function PasswordModal() {
  const [state, dispatch] = useStoreContext();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGenerate = () => {
    dispatch({
      type: GENERATE,
    });
  }

  const tbd = () => {
    return;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Generate Your Password!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Random Password Generator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password Length</Form.Label>
              <Form.Control type="length" placeholder="Enter length" />
              <Form.Text className="text-muted">
                We recommend 8 characters or more
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Select your character sets</Form.Label>
              <Form.Text className="text-muted">
                At least one set must be selected
    </Form.Text>
              <Form.Check type="checkbox" label="Special characters: !#$%&'()*+,-./:;<=>?@[]^_`{|}~" />
              <Form.Check type="checkbox" label="Numbers: 0123456789" />
              <Form.Check type="checkbox" label="Lowercase letters: abcdefghijklmnopqrstuvwxyz" />
              <Form.Check type="checkbox" label="Uppercase letters: ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Your random password:</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>

            <Button variant="primary" type="copy">
              Copy to clipboard
  </Button>
          </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleGenerate}>
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default PasswordModal;

