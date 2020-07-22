import React from 'react';
import './App.css';
import OccurenceList from "./components/OccurenceList";
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import NewQualification from "./components/edit/EditQualification";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Admin from "./components/admin";


function App() {
    return (
        <Router>
            <Container fluid className="App bg-white">
                <Header/>

                <Switch>
                    <Route exact path={"/"}>
                        <OccurenceList/>
                    </Route>
                    <Route exact path={"/admin"}>
                        <Admin/>
                    </Route>
                </Switch>

            </Container>
        </Router>
    );
}

export default App;
