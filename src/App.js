import React from 'react';
import './App.css';
import OccurenceList from "./components/OccurenceList";
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import NewQualification from "./components/edit/NewQualification";

function App() {
  return (
    <Container className="App">
        <Header/>
        {/*<OccurenceList/>*/}
        <NewQualification/>
    </Container>
  );
}

export default App;
