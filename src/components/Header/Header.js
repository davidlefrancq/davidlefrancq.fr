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
                className={"mb-3"}
            >

                <Jumbotron className={"pb-0 mb-2 pt-4 pb-3"}>
                    <div className={"row"}>
                        <h1 className={"col-auto"} style={{fontSize:"x-large"}}>

                            Concepteur Développeur Informatique

                            <span className={"ml-4 codeOrange"} style={{fontSize: "x-large"}}>
                                David Lefrancq
                            </span>

                        </h1>
                    </div>

                    <div className={"utils"}>
                        <a
                            className={"p-1 btn btn-danger"}
                            style={{minHeight: 50}}
                            href={"https://drive.google.com/file/d/1MPOvY3JhS3YT_sHjnBlH-8ETMBrZitap/view?usp=sharing"}
                            // href={"https://drive.google.com/file/d/1iLfuZhBWsX3EjiNebaD-JhMivWHztsfs/view?usp=sharing"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                        >
                            <AiOutlineFilePdf/>
                        </a>

                        <a
                            className={"p-1 btn btn-primary"}
                            style={{minHeight: 50}}
                            href={"https://www.linkedin.com/in/david-lefrancq/"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
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
