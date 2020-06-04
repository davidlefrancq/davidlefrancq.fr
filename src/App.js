import React from 'react';
import './App.css';
import OccurenceList from "./components/OccurenceList";
import Header from "./components/Header";
import {Container} from 'react-bootstrap';

function App() {
  return (
    <Container className="App">
        <Header/>
        <OccurenceList/>
    </Container>
  );
}

export default App;
