import React from 'react';
import './App.css';
import { StoreProvider } from "../src/utils/GlobalState";
import Button from 'react-bootstrap/Button';
import Generator from "../src/components/Generator"

function App() {
  return (
    <StoreProvider>
      <p>test</p>
      <Button>test</Button>
      <Generator></Generator>
    </StoreProvider>
  );
}

export default App;
