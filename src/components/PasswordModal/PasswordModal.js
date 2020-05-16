import { Modal, Button, Form } from 'react-bootstrap';
import { GENERATE } from '../../utils/actions'
import React, { useState, useEffect, useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";

function PasswordModal() {
  const [state, dispatch] = useStoreContext();

  const [sets, setSets] = useState({
    special: false,
    numeric: false,
    lowercase: false,
    uppercase: false
  })

  const refs = [];
  const specialRef = useRef(null);
  const numericRef = useRef(null);
  const lowercaseRef = useRef(null);
  const uppercaseRef = useRef(null);
  refs.push(specialRef, numericRef, lowercaseRef, uppercaseRef);

  const [length, setLength] = useState(0)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGenerate = (event) => {
    event.preventDefault();
    for (const ref of refs) {
      let { id, checked } = ref.current;
      sets[id] = checked;
    }
    // console.log(sets)
    dispatch({
      type: GENERATE,
      length: length,
      sets: sets
    });
  }

  const handleLengthChange = (event) => {
    // console.log(event.target.value)
    setLength(event.target.value);
  }

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
            <Form.Group controlId="lengthForm">
              <Form.Label>Password Length</Form.Label>
              <Form.Control 
              onChange={handleLengthChange} 
              type="length" 
              value={length}
              placeholder="Enter Length" />
              <Form.Text className="text-muted">
                We recommend 8 characters or more, 1000 character limit
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Select your character sets</Form.Label>
              <Form.Text className="text-muted">
                At least one set must be selected
    </Form.Text>
              <Form.Check
                id="special"
                ref={specialRef}
                type="checkbox"
                label="Special characters: !#$%&'()*+,-./:;<=>?@[]^_`{|}~" />
              <Form.Check
                id="numeric"
                ref={numericRef}
                type="checkbox"
                label="Numeric: 0123456789" />
              <Form.Check
                id="lowercase"
                ref={lowercaseRef}
                type="checkbox"
                label="Lowercase letters: abcdefghijklmnopqrstuvwxyz" />
              <Form.Check
                id="uppercase"
                ref={uppercaseRef}
                type="checkbox"
                label="Uppercase letters: ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
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

