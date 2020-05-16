import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { StoreProvider } from "./utils/GlobalState";
import Generator from "./components/Generator/Generator"
import PasswordModal from "./components/PasswordModal/PasswordModal"

function App() {
  return (
    <StoreProvider>
        <PasswordModal></PasswordModal>
        <Generator></Generator>
    </StoreProvider>
  );
}

export default App;
