import React, {Component} from 'react';
import "./loginForm.css";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handleAuthentification = props.handleAuthentification;
    }


    reset = () => {
        const state = {...this.state};
        state.email = "";
        state.password = "";
        this.setState(state);
    }

    handleKeyUp(e) {
        e.preventDefault();
        const {key} = e;
        if (key != undefined && key != null) {
            if (key == "Enter") {
                this.handleSubmit(e);
            }
        }
    }

    handleChange = (e) => {
        const state = {...this.state};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        this.handleAuthentification(email, password);
        this.reset();
    }

    render() {
        return (
            <div className={"form-inline"}>
                <div className={"form-group"}>
                    <input
                        name={"email"}
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(e) => {
                            this.handleChange(e)
                        }}
                        onKeyUp={(e) => {
                            this.handleKeyUp(e)
                        }}
                    />
                </div>
                <div className={"form-group"}>
                    <input
                        name={"password"}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => {
                            this.handleChange(e)
                        }}
                        onKeyUp={(e) => {
                            this.handleKeyUp(e)
                        }}
                    />
                </div>
                <button className="btn btn-success" onClick={(e) => {
                    this.handleSubmit(e)
                }}>
                    Connexion
                </button>
            </div>

            // <div className={"row pl-3 pr-3"}>
            //     <div className={"col-auto p-0"}>
            //         <input
            //             name={"email"}
            //             type="text"
            //             className="form-control"
            //             placeholder="Email"
            //             value={this.state.email}
            //             onChange={(e) => {
            //                 this.handleChange(e)
            //             }}
            //             onKeyUp={(e) => {
            //                 this.handleKeyUp(e)
            //             }}
            //         />
            //     </div>
            //     <div className={"col-auto p-0"}>
            //         <input
            //             name={"password"}
            //             type="password"
            //             className="form-control"
            //             placeholder="Password"
            //             value={this.state.password}
            //             onChange={(e) => {
            //                 this.handleChange(e)
            //             }}
            //             onKeyUp={(e) => {
            //                 this.handleKeyUp(e)
            //             }}
            //         />
            //     </div>
            //     <div className={"col-auto p-0"}>
            //         <button className="float-right btn btn-success" onClick={(e) => {
            //             this.handleSubmit(e)
            //         }}>
            //             Connexion
            //         </button>
            //     </div>
            // </div>
        );
    }
}

export default LoginForm;