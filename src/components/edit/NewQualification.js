import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BsFillInfoCircleFill, BsLink} from "react-icons/bs";
import {MdWork} from "react-icons/md";
import {FiEdit, FiDelete} from "react-icons/fi";
import {Col, Form} from "react-bootstrap";
import EditJob from "./EditJob";
import EditLink from "./EditLink";
import Occurence from "../../bo/Occurence";
import Qualification from "../../bo/Qualification";
import TrainingCenter from "../../bo/TrainingCenter";

// Progress Bar
// https://www.npmjs.com/package/react-step-progress-bar

class NewQualification extends Component {

    constructor(props) {
        super(props);

        const trainingCenter = new TrainingCenter("","","","","","")
        const qualification = new Qualification("","","",trainingCenter,"",{},{});
        const occurence = new Occurence(null,"",qualification,"")

        this.state = {

            occurence: occurence,

            edit: {
                job: {
                    key: null
                },
                link: {
                    key: null,
                },
            },

            style: {
                qualification: {
                    display: "block",
                },
                trainingCenter: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
            },
        };
        this.showQualification = this.showQualification.bind(this);
        this.showTrainingCenter = this.showTrainingCenter.bind(this);
        this.showMoreInformation = this.showMoreInformation.bind(this);

        this.handleAddJob = this.handleAddJob.bind(this);
        this.handleEditJob = this.handleEditJob.bind(this);
        this.handleUpdateJob = this.handleUpdateJob.bind(this);
        this.handleDeleteLink = this.handleDeleteLink.bind(this);
        this.handleEditLink = this.handleEditLink.bind(this);
        this.handleUpdateLink = this.handleUpdateLink.bind(this);
        this.handleAddLink = this.handleAddLink.bind(this);

        this.reset = this.reset.bind(this);

        this.updateDateEnd = this.updateDateEnd.bind(this);
        this.updateTrainingCenterUrl = this.updateTrainingCenterUrl.bind(this);
        this.updateQualificationTitle = this.updateQualificationTitle.bind(this);
        this.updateQualificationLogo = this.updateQualificationLogo.bind(this);
        this.updateQualificationLevel = this.updateQualificationLevel.bind(this);
        this.updateTrainingCenterName = this.updateTrainingCenterName.bind(this);
        this.updateTrainingCenterLogo = this.updateTrainingCenterLogo.bind(this);
        this.updateTrainingCenterAddress = this.updateTrainingCenterAddress.bind(this);
        this.updateTrainingCenterPostalCode = this.updateTrainingCenterPostalCode.bind(this);
        this.updateTrainingCenterCity = this.updateTrainingCenterCity.bind(this);
    }

    reset() {

        const trainingCenter = new TrainingCenter("","","","","","")
        const qualification = new Qualification("","","",trainingCenter,"",{},{});
        const occurence = new Occurence(null,"",qualification,"")

        this.setState({
            occurence: occurence,

            edit: {
                job: {
                    key: null
                },
                link: {
                    key: null,
                },
            },

            style: {
                qualification: {
                    display: "block",
                },
                trainingCenter: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
            },
        });
    }

    updateDateEnd(e) {
        const occurence = {...this.state.occurence};
        occurence.dateEnd = e.target.value;
        this.setState({occurence});
    }

    updateQualificationTitle(e){
        const {value} = e.target;
        this.updateStateQualification("title",value);
    }
    updateQualificationLogo(e){
        e.preventDefault();
        console.log(e);
        // const {value} = e.target;
        // this.updateStateQualification("logo",value);
    }
    updateQualificationLevel(e){
        const {value} = e.target;
        this.updateStateQualification("level",value);
    }

    updateStateQualification(key,value){
        const occurence = {...this.state.occurence};
        occurence.qualification[key] = value;
        this.setState({occurence});
    }

    updateTrainingCenterName(e){
        const {value} = e.target;
        this.updateStateTrainingCenter("name",value);
    }

    updateTrainingCenterLogo(e){
        e.preventDefault();
        console.log("updateTrainingCenterLogo",e);
        // const {value} = e.target;
        // this.updateStateTrainingCenter("logo",value);
    }

    updateTrainingCenterAddress(e){
        const {value} = e.target;
        this.updateStateTrainingCenter("address",value);
    }

    updateTrainingCenterPostalCode(e){
        const {value} = e.target;
        this.updateStateTrainingCenter("postalCode",value);
    }

    updateTrainingCenterCity(e){
        const {value} = e.target;
        this.updateStateTrainingCenter("city",value);
    }

    updateTrainingCenterUrl(e) {
        const {value} = e.target;
        this.updateStateTrainingCenter("url",value);
    }

    updateStateTrainingCenter(key,value){
        const occurence = {...this.state.occurence};
        occurence.qualification.trainingCenter[key] = value;
        this.setState({occurence});
    }

    updateObjectives(data) {

        const occurence = {...this.state.occurence};
        occurence.qualification.objectives = data;
        this.setState({occurence});
    }

    showQualification() {
        this.setState({
            style: {
                qualification: {
                    display: "block",
                },
                trainingCenter: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
            },
        });
    }

    showTrainingCenter() {
        this.setState({
            style: {
                qualification: {
                    display: "none",
                },
                trainingCenter: {
                    display: "block",
                },
                moreInformation: {
                    display: "none",
                },
            },
        });
    }

    showMoreInformation() {
        this.setState({
            style: {
                qualification: {
                    display: "none",
                },
                trainingCenter: {
                    display: "none",
                },
                moreInformation: {
                    display: "block",
                },
            },
        });
    }

    handleAddJob(job) {

        if (job != undefined && job != null) {

            const occurence = {...this.state.occurence};
            const jobs = {...occurence.qualification.jobs};
            jobs[Date.now()] = job;
            occurence.qualification.jobs = jobs;

            this.setState({
                occurence,
            });
        }
    }

    handleAddLink(link) {

        if (link != undefined && link != null) {

            const occurence = {...this.state.occurence};
            const links = {...occurence.qualification.links};
            links[Date.now()] = link;
            occurence.qualification.links = links;

            this.setState({
                occurence,
            });
        }
    }

    handleEditJob(key) {

        if (key != undefined && key != null) {

            const edit = {...this.state.edit};
            edit.job.key = key;
            this.setState({edit});
        }
    }

    handleEditLink(key) {

        if (key != undefined && key != null) {

            const edit = {...this.state.edit};
            edit.link.key = key;
            this.setState({edit});
        }
    }

    handleUpdateJob(key, job) {
        const occurence = {...this.state.occurence};
        const edit = {...this.state.edit};

        occurence.qualification.jobs[key] = job;
        edit.job.key = null;

        this.setState({
            occurence,
            edit,
        });
    }

    handleUpdateLink(key, link) {
        const occurence = {...this.state.occurence};
        const edit = {...this.state.edit};

        occurence.qualification.links[key] = link;
        edit.link.key = null;

        this.setState({
            occurence,
            edit,
        });
    }

    handleDeleteJob(key) {
        const occurence = {...this.state.occurence};
        occurence.qualification.jobs[key] = null;
        this.setState({occurence});
    }

    handleDeleteLink(key) {
        const occurence = {...this.state.occurence};
        occurence.qualification.links[key] = null;
        this.setState({occurence});
    }

    renderJobs() {
        const {jobs} = this.state.occurence.qualification;
        const jobsKeys = Object.keys(jobs);

        return jobsKeys.map((key) => {
            const job = jobs[key];
            if (job != null) {
                return (
                    <div key={key} className={"col-auto"}>
                        <div className={"m-1 row border"}>

                            <div className={"col-auto p-1 text-center"}>
                                <button
                                    className={"btn btn-light p-3"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.handleEditJob(key);
                                    }}
                                >
                                    {job.name}
                                </button>
                            </div>

                            <div className={"col-auto p-1 text-center"}>
                                <button
                                    className={"col-12 btn btn-danger h-100 pl-1 pr-1"}
                                    onClick={() => this.handleDeleteJob(key)}
                                >
                                    <FiDelete/>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }

    renderEditJob() {
        const {edit} = this.state;
        if (edit.job.key == undefined || edit.job.key == null) {
            return (
                <EditJob
                    handleAddJob={this.handleAddJob}
                />
            );
        } else {
            const job = this.state.occurence.qualification.jobs[edit.job.key];
            return (
                <EditJob
                    keyJob={edit.job.key}
                    job={job}
                    handleUpdateJob={this.handleUpdateJob}
                />
            );
        }
    }

    renderLinks() {
        const {links} = this.state.occurence.qualification;
        const linksKeys = Object.keys(links);

        return linksKeys.map((key) => {
            const link = links[key];
            if (link != null) {
                return (
                    <div key={key} className={"col-auto"}>
                        <div className={"m-1 row border"}>

                            <div className={"col-auto p-1 text-center"}>
                                <button
                                    className={"btn btn-light p-3 text-left"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.handleEditLink(key);
                                    }}
                                >
                                    {link.title}
                                    <div className={"small"}>{link.url}</div>
                                </button>
                            </div>

                            <div className={"col-auto p-1 text-center"}>
                                <button
                                    className={"col-12 btn btn-danger h-100 pl-1 pr-1"}
                                    onClick={() => this.handleDeleteLink(key)}
                                >
                                    <FiDelete/>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }

    renderEditLinks() {
        const {edit} = this.state;
        const {key} = edit.link;

        if (key == undefined || key == null) {
            return (
                <EditLink
                    handleAddLink={this.handleAddLink}
                />
            );
        } else {
            const link = this.state.occurence.qualification.links[key];
            return (
                <EditLink
                    keyLink={key}
                    link={link}
                    handleUpdateLink={this.handleUpdateLink}
                />
            );
        }
    }

    render() {

        const {occurence} = this.state;
        const {dateEnd, qualification} = occurence;
        const {title, img, level, trainingCenter, objectives, jobs, links} = qualification;

        return (
            <div className={"row"}>

                <div className={"col-12"}>
                    <h2>Nouveau Diplome</h2>
                </div>

                <div className={"col-12"}>

                    <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"} onClick={this.showQualification}>
                        <BsFillInfoCircleFill/>
                    </button>

                    <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"} onClick={this.showTrainingCenter}>
                        <MdWork/>
                    </button>

                    <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"} onClick={this.showMoreInformation}>
                        <BsLink/>
                    </button>

                </div>

                <div className={"col-12"}>

                    <Form>

                        <div style={{
                            display: this.state.style.qualification.display
                        }}>
                            <h3>Diplome</h3>

                            <Form.Group controlId="qualificationForm.dateEnd">
                                <Form.Label>Date d'obtention</Form.Label>
                                <Form.Control type="date" value={dateEnd} onChange={this.updateDateEnd}/>
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.title">
                                <Form.Label>Titre</Form.Label>
                                <Form.Control type="text" value={title} onChange={this.updateQualificationTitle}/>
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.image">
                                <Form.File label="Logo" onChange={this.updateQualificationLogo} custom />
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.level">
                                <Form.Label>Niveau</Form.Label>
                                <Form.Control type="text" value={level} onChange={this.updateQualificationLevel} placeholder={"ex : Bac"}/>
                            </Form.Group>

                        </div>

                        <div style={{
                            display: this.state.style.trainingCenter.display
                        }}>
                            <h3>Centre de formation</h3>

                            <Form.Group controlId="qualificationForm.trainingCenterName">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" value={trainingCenter.name} onChange={this.updateTrainingCenterName}/>
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.trainingCenterLogo">
                                <Form.File label="Logo" onChange={this.updateTrainingCenterLogo} custom/>
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.trainingCenterAddress">
                                <Form.Label>Adresse</Form.Label>
                                <Form.Control type="text" value={trainingCenter.address} onChange={this.updateTrainingCenterAddress}/>
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.trainingCenterPostalCode">
                                <Form.Label>Code postale</Form.Label>
                                <Form.Control type="text" value={trainingCenter.postalCode} onChange={this.updateTrainingCenterPostalCode}/>
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.trainingCenterCity">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control type="text" value={trainingCenter.city} onChange={this.updateTrainingCenterCity}/>
                            </Form.Group>

                            <Form.Group controlId="qualificationForm.trainingCenterUrl">
                                <Form.Label>Site Web</Form.Label>
                                <Form.Control type="text" value={trainingCenter.url} onChange={this.updateTrainingCenterUrl}/>
                            </Form.Group>

                        </div>

                        <div style={{
                            display: this.state.style.moreInformation.display
                        }}>
                            <h3>Compléments</h3>
                        </div>

                        <div style={{
                            display: this.state.style.moreInformation.display
                        }}>
                            <h4>Résumé de la formation</h4>

                            <Form.Group controlId="qualificationForm.objectives">
                                <Form.Control
                                    className={"d-none"}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.occurence.qualification.objectives}
                                    onChange={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={this.state.occurence.qualification.objectives}
                                    onInit={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        //console.log( 'Editor is ready to use!', editor );
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        //console.log( { event, editor, data } );
                                        this.updateObjectives(data);
                                    }}
                                    onBlur={(event, editor) => {
                                        //console.log( 'Blur.', editor );
                                    }}
                                    onFocus={(event, editor) => {
                                        //console.log( 'Focus.', editor );
                                    }}
                                />
                            </Form.Group>
                        </div>
                    </Form>

                    <div style={{
                        display: this.state.style.moreInformation.display
                    }}>

                        <h4>Emploi(s) accessible(s)</h4>

                        <div className={"row"}>
                            <div className={"col-12"}>
                                {this.renderEditJob()}
                            </div>

                            <div className={"col-12"}>
                                <div className={"row"}>
                                    {this.renderJobs()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: this.state.style.moreInformation.display
                    }}>

                        <h4>Liens</h4>

                        <div className={"row"}>

                            <div className={"col-12"}>
                                {this.renderEditLinks()}
                            </div>

                            <div className={"col-12"}>
                                <div className={"row"}>
                                    {this.renderLinks()}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default NewQualification;