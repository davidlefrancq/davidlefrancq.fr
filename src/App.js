import React from 'react';
import './App.css';
import OccurenceList from "./components/OccurenceList";
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import NewQualification from "./components/edit/NewQualification";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


function App() {
    return (
        <Router>
            <Container className="App">
                <Header/>

                <Switch>
                    <Route exact path={"/"}>
                        <OccurenceList/>
                    </Route>
                    <Route exact path={"/qualification/new"}>
                        <NewQualification/>
                    </Route>
                </Switch>

            </Container>
        </Router>
    );
}

export default App;
