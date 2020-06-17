import React, {Component} from 'react';
import {Col, Form} from "react-bootstrap";
import {FaSave} from "react-icons/fa";
import Job from "../../bo/Job";

class EditJob extends Component {

    constructor(props) {
        super(props);

        const {job, keyJob} = this.props;

        if (job != undefined && job != null && keyJob != undefined && keyJob != null) {
            this.state = {
                key: keyJob,
                job: job,
            }

        } else {

            this.state = {
                job: new Job(""),
            }
        }

        this.handleAddInList = this.props.handleAddJob;
        this.handleUpdateInList = this.props.handleUpdateJob;
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {job, keyJob, handleAddJob, handleUpdateJob} = this.props;

        if (job != undefined && job != null && keyJob != undefined && keyJob != null) {
            if (this.state.key == undefined || this.state.key == null  || this.state.key != keyJob) {

                if (handleAddJob != undefined && handleAddJob != null) {
                    this.handleAddInList = handleAddJob;
                }

                if (handleUpdateJob != undefined && handleUpdateJob != null) {
                    this.handleUpdateInList = handleUpdateJob;
                }

                this.setState({
                    job,
                    key: keyJob,
                });
            }
        }
    }


    handleAdd(e) {
        e.preventDefault();

        const {key, job} = this.state;

        if (key != undefined && key != null) {

            this.handleUpdateInList(key, job);

            this.setState({
                job: {
                    name: "",
                },
                key: null,
            });

        } else {

            this.handleAddInList(job);

            this.setState({
                job: {
                    name: "",
                },
                key: null,
            });
        }
    }

    handleChange(e) {
        const job = {...this.state.job};
        job.name = e.target.value;

        this.setState({
            job
        });
    }

    render() {
        return (
            <Form>

                <Form.Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="jobInput" srOnly>Job</Form.Label>
                        <Form.Control
                            id={"jobInput"}
                            type="text"
                            placeholder="ex : Technicien de maintenance"
                            value={this.state.job.name}
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

export default EditJob;