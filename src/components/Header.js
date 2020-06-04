import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>David Lefrancq</h1>
                <p>Concepteur Développeur Informatique</p>
            </Jumbotron>
        );
    }
}

export default Header;