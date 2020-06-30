import React, {Component} from 'react';
import Link from "../../bo/Link";
import {Col, Form} from "react-bootstrap";
import {FaSave} from "react-icons/fa";

class EditLink extends Component {

    constructor(props) {
        super(props);

        const {link, keyLink} = this.props;

        if (link != undefined && link != null && keyLink != undefined && keyLink != null) {
            this.state = {
                key: keyLink,
                link: link,
            }

        } else {

            this.state = {
                link: new Link("", ""),
            }
        }

        this.handleAddInList = this.props.handleAddLink;
        this.handleUpdateInList = this.props.handleUpdateLink;
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {link, keyLink, handleAddLink, handleUpdateLink} = this.props;

        if (link != undefined && link != null && keyLink != undefined && keyLink != null) {
            if (this.state.key == undefined || this.state.key == null || this.state.key != keyLink) {

                if (handleAddLink != undefined && handleAddLink != null) {
                    this.handleAddInList = handleAddLink;
                }

                if (handleUpdateLink != undefined && handleUpdateLink != null) {
                    this.handleUpdateInList = handleUpdateLink;
                }

                this.setState({
                    link,
                    key: keyLink,
                });
            }
        }
    }

    handleAdd(e) {
        e.preventDefault();

        const {key, link} = this.state;

        if (key != undefined && key != null) {

            this.handleUpdateInList(key, link);

            this.setState({
                link: new Link("", ""),
                key: null,
            });

        } else {

            this.handleAddInList(link);

            this.setState({
                link: new Link("", ""),
                key: null,
            });
        }
    }

    handleChange(e) {

        const {id, value} = e.target;
        const link = {...this.state.link};

        // let validated = true;

        // if (id == "url") {
        //
        //     let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        //     validated = regex.test(value);
        //
        //     if(validated == false){
        //         alert("L'url n'est incorecte.");
        //     }
        // }

        link[id] = value;

        this.setState({
            link
        });
    }

    render() {
        return (
            <Form>

                <Form.Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="linkInput" srOnly>Titre</Form.Label>
                        <Form.Control
                            id={"name"}
                            type="text"
                            placeholder="ex: Google"
                            value={this.state.link.name}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs="auto">
                        <Form.Label htmlFor="linkInput" srOnly>URL</Form.Label>
                        <Form.Control
                            id={"url"}
                            type="text"
                            placeholder="ex : www.google.fr"
                            value={this.state.link.url}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs="auto">
                        <button className={"btn btn-primary"} onClick={this.handleAdd}>
                            <FaSave className={"m-0 p-0"}/>
                        </button>
                    </Col>
                </Form.Row>

            </Form>
        );
    }
}

export default EditLink;