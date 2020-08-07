import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BsFillInfoCircleFill, BsLink} from "react-icons/bs";
import {MdWork} from "react-icons/md";
import {FiEdit, FiDelete} from "react-icons/fi";
import {Col, Form} from "react-bootstrap";
import EditJob from "./EditJob";
import EditLink from "./EditLink";
import Occurrence from "../../../bo/Occurrence";
import Qualification from "../../../bo/Qualification";
import TrainingCenter from "../../../bo/TrainingCenter";
import ProgressBar from "../../ProgressBar/ProgressBar";
import OccurrenceItem from "../OccurrenceItem";
import {connect} from "react-redux";
import DAOFactory from "../../../dal/DAOFactory";
import {actions} from "../../../actions";


const daoFactory = new DAOFactory();

class EditQualification extends Component {

    constructor(props) {
        super(props);

        this.handleAddJob = this.handleAddJob.bind(this);
        this.handleEditJob = this.handleEditJob.bind(this);
        this.handleUpdateJob = this.handleUpdateJob.bind(this);
        this.handleDeleteLink = this.handleDeleteLink.bind(this);
        this.handleEditLink = this.handleEditLink.bind(this);
        this.handleUpdateLink = this.handleUpdateLink.bind(this);
        this.handleAddLink = this.handleAddLink.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.reset = this.reset.bind(this);

        this.updateDateEnd = this.updateDateEnd.bind(this);
        this.updateTrainingCenterUrl = this.updateTrainingCenterUrl.bind(this);
        this.updateQualificationName = this.updateQualificationName.bind(this);
        this.updateQualificationLogo = this.updateQualificationLogo.bind(this);
        this.updateQualificationLevel = this.updateQualificationLevel.bind(this);
        this.updateTrainingCenterName = this.updateTrainingCenterName.bind(this);
        this.updateTrainingCenterLogo = this.updateTrainingCenterLogo.bind(this);
        this.updateTrainingCenterAddress = this.updateTrainingCenterAddress.bind(this);
        this.updateTrainingCenterPostalCode = this.updateTrainingCenterPostalCode.bind(this);
        this.updateTrainingCenterCity = this.updateTrainingCenterCity.bind(this);

        this.state = {

            edit: {
                job: {
                    key: null
                },
                link: {
                    key: null,
                },
            },

            file: null,

            style: {
                qualification: {
                    display: "block",
                },
                trainingCenter: {
                    display: "none",
                },
                abstract: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
                validate: {
                    display: "none",
                },
            },

            steps: {
                0: {
                    title: "Diplome",
                    action: this.showQualification,
                    active: true,
                },
                1: {
                    title: "Centre de formation",
                    action: this.showTrainingCenter,
                },
                2: {
                    title: "Résumé du diplome",
                    action: this.showAbstract,
                },
                3: {
                    title: "Informations complémentaires",
                    action: this.showMoreInformation,
                },
                4: {
                    title: "Valider",
                    action: this.showValidate,
                },
            },
        };
    }

    normalizerDateEdit(date) {
        let result = "";
        if (date !== undefined && date !== null && !(date instanceof Date)) {
            result = new Date(date);
            result = result.toISOString().split("T")[0];
        }else if(date instanceof Date){
            result = date.toISOString().split("T")[0];
        }
        return result;
    }

    reset() {

        const trainingCenter = new TrainingCenter(null, null, null, null, null, null)
        const qualification = new Qualification(null, null, null, trainingCenter, "", [], []);
        const occurrence = new Occurrence(null, null, qualification, null)

        this.setState({
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
                abstract: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
                validate: {
                    display: "none",
                },
            },
        });

        this.props.setOccurrence(occurrence);
    }

    updateDateEnd(e) {
        const occurrence = {...this.props.occurrence};
        occurrence.dateEnd = e.target.value;
        this.props.setOccurrence(occurrence);
    }

    updateQualificationName(e) {
        const {value} = e.target;
        this.updateStateQualification("name", value);
    }

    updateQualificationLogo(e) {
        e.preventDefault();

        const {token} = this.props;
        const file = e.target.files[0];

        const occurrenceDAO = daoFactory.getOccurrenceDAO();
        occurrenceDAO.uploadImage(file, token).then(this.uploadQualificationLogoSuccess, this.uploadQualificationLogoError);
    }

    uploadQualificationLogoSuccess = (res) => {
        const {data} = res;
        const {contentUrl} = data;
        const occurrence = {...this.props.occurrence};
        occurrence.qualification.img = contentUrl;
        this.props.setOccurrence(occurrence);
    }
    uploadQualificationLogoError = (res) => {
        console.log(res);
    }



    updateQualificationLevel(e) {
        const {value} = e.target;
        this.updateStateQualification("level", value);
    }

    updateStateQualification(key, value) {
        const occurrence = {...this.props.occurrence};
        occurrence.qualification[key] = value;
        this.props.setOccurrence(occurrence);
    }

    updateTrainingCenterName(e) {
        const {value} = e.target;
        this.updateStateTrainingCenter("name", value);
    }

    updateTrainingCenterLogo(e) {
        e.preventDefault();
        console.log("updateTrainingCenterLogo", e);
        // const {value} = e.target;
        // this.updateStateTrainingCenter("logo",value);
    }

    updateTrainingCenterAddress(e) {
        const {value} = e.target;
        this.updateStateTrainingCenter("address", value);
    }

    updateTrainingCenterPostalCode(e) {
        const {value} = e.target;
        this.updateStateTrainingCenter("postalCode", value);
    }

    updateTrainingCenterCity(e) {
        const {value} = e.target;
        this.updateStateTrainingCenter("city", value);
    }

    updateTrainingCenterUrl(e) {
        const {value} = e.target;
        this.updateStateTrainingCenter("url", value);
    }

    updateStateTrainingCenter(key, value) {
        const occurrence = {...this.props.occurrence};
        occurrence.qualification.trainingCenter[key] = value;
        this.props.setOccurrence(occurrence);
    }

    updateObjectives(data) {

        const occurrence = {...this.props.occurrence};
        occurrence.qualification.objectives = data;
        this.props.setOccurrence(occurrence);
    }

    showQualification = () => {
        this.setState({
            style: {
                qualification: {
                    display: "block",
                },
                trainingCenter: {
                    display: "none",
                },
                abstract: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
                validate: {
                    display: "none",
                },
            },
        });
    }

    handleShowQualification = (e) => {
        e.preventDefault();
        this.showQualification();
    }

    showTrainingCenter = () => {
        this.setState({
            style: {
                qualification: {
                    display: "none",
                },
                trainingCenter: {
                    display: "block",
                },
                abstract: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
                validate: {
                    display: "none",
                },
            },
        });
    }

    handleShowTrainingCenter = (e) => {
        e.preventDefault();
        this.showTrainingCenter();
    }

    showAbstract = () => {
        this.setState({
            style: {
                qualification: {
                    display: "none",
                },
                trainingCenter: {
                    display: "none",
                },
                abstract: {
                    display: "block",
                },
                moreInformation: {
                    display: "none",
                },
                validate: {
                    display: "none",
                },
            },
        });
    }

    handleShowAbstract = (e) => {
        e.preventDefault();
        this.showAbstract();
    }

    showMoreInformation = () => {
        this.setState({
            style: {
                qualification: {
                    display: "none",
                },
                trainingCenter: {
                    display: "none",
                },
                abstract: {
                    display: "none",
                },
                moreInformation: {
                    display: "block",
                },
                validate: {
                    display: "none",
                },
            },
        });
    }

    handleShowMoreInformation = (e) => {
        e.preventDefault();
        this.showMoreInformation();
    }

    showValidate = () => {
        this.setState({
            style: {
                qualification: {
                    display: "none",
                },
                trainingCenter: {
                    display: "none",
                },
                abstract: {
                    display: "none",
                },
                moreInformation: {
                    display: "none",
                },
                validate: {
                    display: "block",
                },
            },
        });
    }

    handleShowValidate = (e) => {
        e.preventDefault();
        this.showValidate();
    }

    handleAddJob(job) {

        if (job != undefined && job != null) {

            const occurrence = {...this.props.occurrence};
            const jobs = occurrence.qualification.jobs;
            jobs[jobs.length] = job;
            occurrence.qualification.jobs = jobs;

            this.props.setOccurrence(occurrence);
        }
    }

    handleAddLink(link) {

        if (link != undefined && link != null) {

            const occurrence = {...this.props.occurrence};
            const links = occurrence.qualification.links;
            links[links.length] = link;
            occurrence.qualification.links = links;

            this.props.setOccurrence(occurrence);
        }
    }

    handleEditJob(key) {

        if (key != undefined && key != null) {

            const state = {...this.state};
            state.edit.job.key = key;
            this.setState(state);
        }
    }

    handleEditLink(key) {

        if (key != undefined && key != null) {

            const state = {...this.state};
            state.edit.link.key = key;
            this.setState(state);
        }
    }

    handleUpdateJob(key, job) {
        const occurrence = {...this.props.occurrence};
        const state = {...this.state};

        occurrence.qualification.jobs[key] = job;
        state.edit.job.key = null;

        this.setState(state);
        this.props.setOccurrence(occurrence);
    }

    handleUpdateLink(key, link) {
        const occurrence = {...this.props.occurrence};
        const state = {...this.state};

        occurrence.qualification.links[key] = link;
        state.edit.link.key = null;

        this.setState(state);
        this.props.setOccurrence(occurrence);
    }

    handleDeleteJob(key) {
        const occurrence = {...this.props.occurrence};
        occurrence.qualification.jobs[key] = null;
        this.props.setOccurrence(occurrence);
    }

    handleDeleteLink(key) {
        const occurrence = {...this.props.occurrence};
        occurrence.qualification.links[key] = null;
        this.props.setOccurrence(occurrence);
    }

    handleSave(e) {
        e.preventDefault();
        const {occurrence,token} = this.props;

        daoFactory.getOccurrenceDAO().insert(occurrence,token).then((res) => {
            this.reset();
        });
    }

    renderJobs() {
        const {jobs} = this.props.occurrence.qualification;
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
            const job = this.props.occurrence.qualification.jobs[edit.job.key];
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
        const {links} = this.props.occurrence.qualification;
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
                                    {link.name}
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
            const link = this.props.occurrence.qualification.links[key];
            return (
                <EditLink
                    keyLink={key}
                    link={link}
                    handleUpdateLink={this.handleUpdateLink}
                />
            );
        }
    }

    renderProgressBar() {
        const {steps} = this.state;
        return (
            <ProgressBar steps={steps}/>
        );
    }

    render() {

        const {occurrence} = this.props;
        const {dateEnd, qualification} = occurrence;
        const {name, img, level, trainingCenter, objectives, jobs, links} = qualification;

        const occurrenceValidate = {...occurrence};
        if (!(occurrenceValidate.dateEnd instanceof Date) && occurrenceValidate.dateEnd != "") {
            occurrenceValidate.dateEnd = new Date(occurrenceValidate.dateEnd);
        }

        return (
            <div className={"container-fluid"}>
                <div className={"row"}>

                    {/*<div className={"col-12"}>*/}
                    {/*    <h2>Nouveau Diplome</h2>*/}
                    {/*</div>*/}

                    {/*<div className={"col-12"}>*/}

                    {/*    <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"} onClick={this.showQualification}>*/}
                    {/*        <BsFillInfoCircleFill/>*/}
                    {/*    </button>*/}

                    {/*    <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"} onClick={this.showTrainingCenter}>*/}
                    {/*        <MdWork/>*/}
                    {/*    </button>*/}

                    {/*    <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"} onClick={this.showMoreInformation}>*/}
                    {/*        <BsLink/>*/}
                    {/*    </button>*/}

                    {/*</div>*/}

                    <div className={"col-12 mt-4 mb-4"}>
                        {this.renderProgressBar()}
                    </div>

                    <div className={"col-12"}>

                        <Form>

                            <div style={{
                                display: this.state.style.qualification.display
                            }}>
                                <h3>Diplome</h3>

                                <div className={"row"}>
                                    <div className={"col-6 col-xl-3"}>
                                        <Form.Group controlId="qualificationForm.image">
                                            <Form.Label>Logo</Form.Label>
                                            <Form.File label={""} onChange={this.updateQualificationLogo} custom/>
                                        </Form.Group>
                                    </div>
                                    <div className={"col-12 col-xl-3"}>
                                        <Form.Group controlId="qualificationForm.dateEnd">
                                            <Form.Label>Date d'obtention</Form.Label>
                                            <Form.Control type={"date"} value={this.normalizerDateEdit(dateEnd)}
                                                          onChange={this.updateDateEnd}/>
                                        </Form.Group>
                                    </div>
                                    <div className={"col-6 col-xl-4"}>
                                        <Form.Group controlId="qualificationForm.title">
                                            <Form.Label>Titre</Form.Label>
                                            <Form.Control type="text" value={name ? name : ""}
                                                          onChange={this.updateQualificationName}/>
                                        </Form.Group>
                                    </div>
                                    <div className={"col-12 col-xl-2"}>
                                        <Form.Group controlId="qualificationForm.level">
                                            <Form.Label>Niveau</Form.Label>
                                            <Form.Control type="text" value={level ? level : ""}
                                                          onChange={this.updateQualificationLevel}
                                                          placeholder={"ex : Bac"}/>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: this.state.style.trainingCenter.display
                            }}>
                                <h3>Centre de formation</h3>

                                <div className={"row"}>
                                    <div className={"col-12 col-xl-3"}>
                                        <Form.Group controlId="qualificationForm.trainingCenterLogo">
                                            <Form.Label>Logo</Form.Label>
                                            <Form.File label="" onChange={this.updateTrainingCenterLogo} custom/>
                                        </Form.Group>
                                    </div>
                                    <div className={"col-12 col-xl-9"}>
                                        <Form.Group controlId="qualificationForm.trainingCenterName">
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="text"
                                                          value={trainingCenter.name ? trainingCenter.name : ""}
                                                          onChange={this.updateTrainingCenterName}/>
                                        </Form.Group>
                                    </div>

                                    <div className={"col-12 col-xl-6"}>
                                        <Form.Group controlId="qualificationForm.trainingCenterAddress">
                                            <Form.Label>Adresse</Form.Label>
                                            <Form.Control type="text"
                                                          value={trainingCenter.address ? trainingCenter.address : ""}
                                                          onChange={this.updateTrainingCenterAddress}/>
                                        </Form.Group>
                                    </div>
                                    <div className={"col-12 col-xl-2"}>
                                        <Form.Group controlId="qualificationForm.trainingCenterPostalCode">
                                            <Form.Label>Code postale</Form.Label>
                                            <Form.Control type="text"
                                                          value={trainingCenter.postalCode ? trainingCenter.postalCode : ""}
                                                          onChange={this.updateTrainingCenterPostalCode}/>
                                        </Form.Group>
                                    </div>
                                    <div className={"col-12 col-xl-4"}>
                                        <Form.Group controlId="qualificationForm.trainingCenterCity">
                                            <Form.Label>Ville</Form.Label>
                                            <Form.Control type="text"
                                                          value={trainingCenter.city ? trainingCenter.city : ""}
                                                          onChange={this.updateTrainingCenterCity}/>
                                        </Form.Group>

                                    </div>
                                </div>

                                <Form.Group controlId="qualificationForm.trainingCenterUrl">
                                    <Form.Label>Site Web</Form.Label>
                                    <Form.Control type="text" value={trainingCenter.url ? trainingCenter.url : ""}
                                                  onChange={this.updateTrainingCenterUrl}/>
                                </Form.Group>

                            </div>

                            <div style={{
                                display: this.state.style.abstract.display
                            }}>
                                <h3>Résumé de la formation</h3>


                                <Form.Group controlId="qualificationForm.objectives">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={objectives}
                                        onInit={editor => {
                                            editor.setData(objectives);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
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

                        <div className={"row"}>
                            <div className={"col-6 border border-top-0 border-left-0 border-bottom-0"} style={{
                                display: this.state.style.moreInformation.display
                            }}>

                                <h3>Emploi(s) accessible(s)</h3>

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

                            <div className={"col-6"} style={{
                                display: this.state.style.moreInformation.display
                            }}>

                                <h3>Liens</h3>

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


                            <div className={"col-12"} style={{
                                display: this.state.style.validate.display
                            }}>

                                <div className={"text-center"}>
                                    <button className={"btn btn-success"} onClick={this.handleSave}>
                                        <h3 className={"mb-0"}>Valider</h3>
                                    </button>
                                </div>

                                <OccurrenceItem occurrence={occurrenceValidate}/>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {occurrence} = state.OccurrencesReducer;
    const {token} = state.AuthentificationReducer;
    return {
        occurrence,
        token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOccurrence: (occurrence)=>{dispatch(actions.occurrences.setOccurrence(occurrence))},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditQualification);