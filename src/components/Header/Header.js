import React, {Component, createRef} from 'react';
import {Jumbotron} from 'react-bootstrap';
import copy from "copy-to-clipboard";
import {AiOutlineFilePdf} from "react-icons/ai";
import "./header.css";
import {
    FaClipboardList,
    SiGmail,
    SiLinkedin
} from "react-icons/all";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {
                 msgCopyEmail: "msg-copy-email-disabled",
            },
            email: "@EMail",
        };
        this.refEmail = createRef();
    }

    copyEmail = () => {
        let address = "david.lefrancq";
        address += "@gmail.com";

        try {
            copy(address);
            const state = {...this.state};
            state.style.msgCopyEmail = "msg-copy-email";
            this.setState(state);
            setTimeout(this.hideMsgCopyEmail, 1000);
        } catch (error) {
            // console.log(error);
        }
    }
    hideMsgCopyEmail = () => {
        const state = {...this.state};
        state.style.msgCopyEmail = "msg-copy-email-disabled";
        this.setState(state);
    }

    render() {

        return (
            <div
                className={"shadow"}
            >

                <Jumbotron className={"mb-0 pt-4 pb-3 shadow-none border-bottom"}>
                    <div className={"row"}>
                        <div className={"col-auto mt-3"}>
                            {"Class Title { "}
                        </div>
                        <h1 className={"col-auto"}>
                            Concepteur Développeur Informatique
                        </h1>
                        <div className={"col-auto mt-3"}>
                            {"}"}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-auto mt-3"}>
                            {"Class Name { "}
                        </div>
                        <div className={"col-auto"}>
                            <p style={{fontSize: "xx-large"}}>
                                David Lefrancq
                            </p>
                        </div>
                        <div className={"col-auto mt-3"}>
                            {"}"}
                        </div>
                    </div>

                    <div className={"utils"}>
                        <a
                            className={"p-1 btn btn-danger"}
                            style={{minHeight: 50}}
                            href={"https://drive.google.com/file/d/1iLfuZhBWsX3EjiNebaD-JhMivWHztsfs/view?usp=sharing"}
                            target={"_blank"}
                        >
                            <AiOutlineFilePdf/>
                        </a>

                        <a
                            className={"p-1 btn btn-primary"}
                            style={{minHeight: 50}}
                            href={"https://www.linkedin.com/in/david-lefrancq/"}
                            target={"_blank"}
                        >
                            <SiLinkedin/>
                        </a>

                        <button className={"p-1 btn btn-primary"} onClick={this.copyEmail}
                                style={{minHeight: 50}}
                        >
                            <span ref={this.refEmail} className={"m-1"}>
                                <SiGmail size={14}/>
                            </span>
                        </button>

                        <div className={`p-3 ${this.state.style.msgCopyEmail}`}
                             style={{minHeight: 50}}
                        >

                            <span className={"mr-1"}><span className={"font-weight-bold"}>@email</span> copier dans le presse papier</span>
                            <FaClipboardList style={{marginBottom: 3}}/>
                        </div>
                    </div>

                </Jumbotron>

            </div>
        );
    }
}

export default Header;
