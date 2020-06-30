import React, {Component, Fragment} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {connect} from "react-redux";
import {actions} from '../actions';
import {Link} from "react-router-dom";

class Header extends Component {

    constructor(props) {
        super(props);
    }

    handleAuthentification = () => {
        const {setAuthentification, isLoggedIn} = this.props;
        setAuthentification(!isLoggedIn);
    }

    renderAuthentificationLabel() {

        const {isLoggedIn} = this.props;

        if (isLoggedIn) {
            return "Deconnexion";
        } else {
            return "Connexion";
        }
    }

    renderButtonAdmin() {
        const {isLoggedIn} = this.props;
        if (isLoggedIn) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                </li>
            );
        }
    }

    render() {
        return (
            <Fragment>

                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand" href="/">
                        <img
                            src={"/logo.png"}
                            alt={"log"} style={{width: "40px"}}/>
                    </a>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Accueil</Link>
                        </li>

                        {this.renderButtonAdmin()}

                        <li className="nav-item">
                            <a className="nav-link" onClick={this.handleAuthentification}>
                                {this.renderAuthentificationLabel()}
                            </a>
                        </li>
                    </ul>
                </nav>

                <Jumbotron>
                    <h1>David Lefrancq</h1>
                    <p>Concepteur Développeur Informatique</p>
                </Jumbotron>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.AuthentificationReducer.isLoggedIn,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthentification: (isLoggedIn) => dispatch(actions.authentification.setAuthentification(isLoggedIn)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);