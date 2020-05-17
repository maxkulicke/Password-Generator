import { Modal, Button, Form } from 'react-bootstrap';
import { GENERATE } from '../../utils/actions'
import React, { useState, useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";

function PasswordModal() {
  const [state, dispatch] = useStoreContext();
  let { password } = state;

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

  const [length, setLength] = useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGenerate = (event) => {
    event.preventDefault();
    if (queryValidator()) {
      for (const ref of refs) {
        let { id, checked } = ref.current;
        sets[id] = checked;
      }
      dispatch({
        type: GENERATE,
        length: length,
        sets: sets
      });
    }
  }

  const queryValidator = () => {
    let validLength = (length >= 8 && length <= 120 ? true : false);
    if (!validLength) {
      alert("Password length must be between 8 - 120 characters!")
    }
    let validSets = false;
    for (const ref of refs) {
      let { checked } = ref.current;
      if (checked) { validSets = true }
    }
    if (!validSets) {
      alert("At lease one character set must be selected!")
    }
    return (validLength && validSets ? true : false);
  }

  const handleLengthChange = (event) => {
    let lengthVal = (!isNaN(parseInt(event.target.value)) ? parseInt(event.target.value) : "")
    setLength(lengthVal);
  }

  const handleCopy = (event) => {
    event.preventDefault();
    if (password === "") {
      alert("no password has been generated yet...");
    } else {
      document.getElementById("passwordDisplay").select();
      document.execCommand("copy");
      alert("Your password has been copied to your clipboard!");
    }
  }

  return (
    <>
      <Button variant="secondary" id="begin" onClick={handleShow}>
        Random Password Generator
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
                Length must be between 8 - 200 characters
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="characterSets">
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

            <Form.Group controlId="passwordDisplay">
              <Form.Label>Your random password:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={password}
              />
            </Form.Group>

            <Button variant="dark" type="copy" onClick={handleCopy}>
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

