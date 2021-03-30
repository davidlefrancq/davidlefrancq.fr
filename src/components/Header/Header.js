import React, {Component, Fragment} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {connect} from "react-redux";
import {actions} from '../../actions';
import {Link} from "react-router-dom";
import DAOFactory from "../../dal/DAOFactory";
import LoginForm from "../LoginForm/LoginForm";
import {STRING_LOGIN, STRING_LOGOUT} from "../../translation/fr-fr";
import {AiOutlineFilePdf, AiOutlineLogin, AiOutlineLogout} from "react-icons/ai";
import {GrDocumentPdf, MdPictureAsPdf} from "react-icons/all";
import "./header.css";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connection: {
                title: STRING_LOGIN,
                authForm: false,
                authFormAnimation: "",
            },
            style: {
                subtitleAnimation:"",
                logoAnimation: "",
                logoFirstAnimation: "",
                logoLastAnimation: "",
                loginFormActive: "",
            }
        };
    }

    openFormAuth = () => {
        const state = {...this.state};
        state.connection.authForm = true;
        // state.connection.authFormAnimation = "auth-form-on";
        state.style.loginFormActive = "active-animation";
        this.setState(state);
    }

    closeFormAuth = () => {
        const state = {...this.state};
        state.connection.authForm = false;
        // state.connection.authFormAnimation = "auth-form-off";
        state.style.loginFormActive = "inactive-animation";
        this.setState(state);
    }

    logout = () => {
        const {setToken, setAuthentification} = this.props;
        const state = {...this.state};
        setToken(null);
        setAuthentification(false);
        state.connection.title = STRING_LOGIN;
        state.connection.authForm = false;
        // state.connection.authFormAnimation = "";
        this.setState(state);
    }

    handleAuthForm = () => {
        const {isLoggedIn} = this.props;
        const {authForm} = this.state.connection;

        if (isLoggedIn) {
            this.logout();
        } else {
            if (!authForm) {
                this.openFormAuth();

            } else {
                this.closeFormAuth();
            }
        }
    }

    handleAuthentificationSuccess = (res) => {

        const state = {...this.state};
        const {setAuthentification, setToken} = this.props;
        const token = res.data.token;

        setToken(token);
        setAuthentification(true);
        state.connection.title = STRING_LOGOUT;

        this.setState(state);
    }

    handleAuthentificationFailure = (res) => {

        const {setAuthentification} = this.props;
        const state = {...this.state};

        state.connection.authForm = false;
        this.setState(state);

        setAuthentification(false);
    }

    handleAuthentification = (email, password) => {

        const {setAuthentification, isLoggedIn, setToken} = this.props;
        const daoFactory = new DAOFactory();
        const state = {...this.state};

        if (!isLoggedIn) {
            // state.connection.authFormAnimation = "auth-form-off";
            this.setState(state);

            daoFactory
                .getAuthenticationDAO()
                .login(email, password)
                .then(this.handleAuthentificationSuccess, this.handleAuthentificationFailure)
            ;
        } else {
            setToken(null);
            setAuthentification(false);
            state.connection.title = STRING_LOGIN;
            state.connection.authForm = false;
            this.setState(state);
        }
    }

    renderAuthentificationLabel() {
        const {authForm} = this.state.connection;
        if (authForm) {
            return <AiOutlineLogin style={{fontSize: "x-large"}}/>;
        } else {
            return <AiOutlineLogout style={{fontSize: "x-large"}}/>;
        }
    }

    renderButtonHome(){
        const {isLoggedIn} = this.props;
        if (isLoggedIn) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/">Accueil</Link>
                </li>
            );
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

    logoEnterAnimation = () => {
        const state = {...this.state};
        state.style.subtitleAnimation = "subtitle-hover"
        state.style.logoAnimation = "logo-hover"
        state.style.logoFirstAnimation = "logo-first-action-hover"
        state.style.logoLastAnimation = "logo-last-action-hover"
        this.setState(state);
    }

    logoLeaveAnimation = () => {
        const state = {...this.state};
        state.style.subtitleAnimation = "subtitle-leave"
        state.style.logoAnimation = "logo-leave"
        state.style.logoFirstAnimation = "logo-first-action-leave"
        state.style.logoLastAnimation = "logo-last-action-leave"
        this.setState(state);
    }

    render() {
        const {isLoggedIn} = this.props;
        const {authFormAnimation} = this.state.connection;
        const {subtitleAnimation, logoFirstAnimation, logoLastAnimation, logoAnimation, loginFormActive} = this.state.style;
        let dNone = "";
        if (isLoggedIn) {
            dNone = "d-none";
        }


        return (
            <Fragment>

                <nav className="navbar navbar-expand-sm navbar-dark bg-primary p-0 mt-0 ml-0 mr-0 mb-4">
                    <Link className={"col-auto navbar-brand p-0 m-0"} to={"/"}>
                    {/*<a className="col-auto navbar-brand p-0 m-0" href="/">*/}
                        <div className={`logo ${logoAnimation}`}
                             onMouseEnter={this.logoEnterAnimation}
                             onMouseLeave={this.logoLeaveAnimation}
                        >
                            <div className={"initial"}>D</div>
                            <div className={`first-name ${logoFirstAnimation}`}>avid</div>
                            <div className={"initial"}>L</div>
                            <div className={`last-name ${logoLastAnimation}`}>efrancq</div>
                        </div>
                    {/*</a>*/}
                    </Link>

                    {/*<h1 className={"col-auto ml-3 text-white"}>Concepteur Développeur Informatique</h1>*/}

                    <ul className="navbar-nav mr-auto ml-auto menu">
                        {this.renderButtonHome()}
                        {this.renderButtonAdmin()}
                    </ul>

                    {/*<div className={`navbar-nav login-form auth-form ${authFormAnimation} ${dNone}`}>*/}
                    <div className={`navbar-nav login-form ${loginFormActive} ${dNone}`}>
                        <form>
                            <LoginForm handleAuthentification={this.handleAuthentification}/>
                        </form>
                    </div>

                    <ul className="navbar-nav">
                        <li className="nav-item" onClick={this.handleAuthForm} style={{userSelect:"none"}}>
                            <a className="nav-link">
                                {this.renderAuthentificationLabel()}
                            </a>
                        </li>
                    </ul>

                </nav>

                <Jumbotron className={"pt-4"}>
                    <h1 className={``}>Concepteur Développeur Informatique</h1>
                    <p className={`${subtitleAnimation}`}>David Lefrancq</p>
                    <a className={"btn btn-danger"} href={"./David LEFRANCQ - CV Web.pdf"} target={"_blank"}>
                        {/*<MdPictureAsPdf/>*/}
                        <AiOutlineFilePdf className={"mb-2"}/>
                        <span className={"ml-2"}>CV</span>
                    </a>
                </Jumbotron>

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