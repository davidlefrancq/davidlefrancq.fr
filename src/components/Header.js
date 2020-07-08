import React, {Component, Fragment} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {connect} from "react-redux";
import {actions} from '../actions';
import {Link} from "react-router-dom";
import DAOFactory from "../dal/DAOFactory";
import LoginForm from "./LoginForm/LoginForm";
import {STRING_LOGIN, STRING_LOGOUT} from "../translation/fr-fr";
import { AiOutlineLogin, AiOutlineLogout} from "react-icons/ai";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connection:{
                title:STRING_LOGIN,
                authForm:false,
                authFormAnimation:"",
            },
        };
    }

    openFormAuth = () => {
        const state = {...this.state};
        state.connection.authForm = true;
        state.connection.authFormAnimation = "auth-form-on";
        this.setState(state);
    }

    closeFormAuth = () => {
        const state = {...this.state};
        state.connection.authForm = false;
        state.connection.authFormAnimation = "auth-form-off";
        this.setState(state);
    }

    logout = () => {
        const {setToken, setAuthentification} = this.props;
        const state = {...this.state};
        setToken(null);
        setAuthentification(false);
        state.connection.title = STRING_LOGIN;
        state.connection.authForm = false;
        state.connection.authFormAnimation = "";
        this.setState(state);
    }

    handleAuthForm = () => {
        const {isLoggedIn} = this.props;
        const {authForm} = this.state.connection;

        if(isLoggedIn){
            this.logout();
        }else{
            if(!authForm){
                this.openFormAuth();

            }else{
                this.closeFormAuth();
            }
        }
    }

    handleAuthentificationSuccess = (res) => {

        console.log("res",res);
        console.log("token",res.data.token);

        const state = {...this.state};
        const {setAuthentification, setToken} = this.props;
        const token = res.data.token;

        setToken(token);
        setAuthentification(true);
        state.connection.title = STRING_LOGOUT;

        this.setState(state);
    }

    handleAuthentificationFailure = (res) => {
        console.log("handleAuthentificationFailure",res);
    }

    handleAuthentification = (email,password) => {

        const {setAuthentification, isLoggedIn, setToken} = this.props;
        const daoFactory = new DAOFactory();
        const state = {...this.state};

        if(!isLoggedIn){
            state.connection.authFormAnimation = "auth-form-off";
            this.setState(state);

            daoFactory
                .getAuthenticationDAO()
                .login(email,password)
                .then(this.handleAuthentificationSuccess, this.handleAuthentificationFailure)
            ;
        }else{
            setToken(null);
            setAuthentification(false);
            state.connection.title = STRING_LOGIN;
            state.connection.authForm = false;
            this.setState(state);
        }
    }

    renderAuthentificationLabel() {
        const {authForm} = this.state.connection;
        if(authForm){
            return <AiOutlineLogin style={{fontSize:"x-large"}}/>;
        }else {
            return <AiOutlineLogout style={{fontSize:"x-large"}}/>;
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
        const {isLoggedIn} = this.props;
        const {authFormAnimation} = this.state.connection;
        let dNone = "";
        if(isLoggedIn){
            dNone = "d-none";
        }
        return (
            <Fragment>

                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand" href="/">
                        <img
                            src={"/logo.png"}
                            alt={"log"} style={{width: "40px"}}/>
                    </a>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Accueil</Link>
                        </li>

                        {this.renderButtonAdmin()}
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.handleAuthForm}>
                                {this.renderAuthentificationLabel()}
                            </a>
                        </li>
                    </ul>

                </nav>

                <Jumbotron>
                    <h1>David Lefrancq</h1>
                    <p>Concepteur Développeur Informatique</p>
                </Jumbotron>

                <div className={`auth-form ${authFormAnimation} ${dNone}`}>
                    <LoginForm handleAuthentification={this.handleAuthentification}/>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.AuthentificationReducer.isLoggedIn,
        token: state.AuthentificationReducer.token,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthentification: (isLoggedIn) => dispatch(actions.authentification.setAuthentification(isLoggedIn)),
        setToken: (token) => dispatch(actions.authentification.setToken(token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);