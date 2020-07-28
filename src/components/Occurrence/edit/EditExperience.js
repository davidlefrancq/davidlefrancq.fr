import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormGroup, Form} from "react-bootstrap";
import EditTechnologicalCategory from "./EditTechnologicalCategory";
import EditLink from "./EditLink";
import {FiDelete} from "react-icons/fi";
import {actions} from "../../../actions";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import OccurrenceItem from "../OccurrenceItem";
import ProgressBar from "../../ProgressBar/ProgressBar";
import DAOFactory from "../../../dal/DAOFactory";
import TrainingCenter from "../../../bo/TrainingCenter";
import Qualification from "../../../bo/Qualification";
import Occurrence from "../../../bo/Occurrence";
import Experience from "../../../bo/Experience";
import Enterprise from "../../../bo/Enterprise";

const daoFactory = new DAOFactory();

class EditExperience extends Component {

    constructor(props) {
        super(props);
        this.state = {

            edit: {
                technology: {
                    key: null
                },
                link: {
                    key: null,
                },
            },

            style: {
                experience: {
                    display: "block",
                },
                enterprise: {
                    display: "none",
                },
                comment: {
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
                    title: "Expérience",
                    action: this.showExperience,
                    active: true,
                },
                1: {
                    title: "Entreprise",
                    action: this.showEnterprise,
                },
                2: {
                    title: "Résumé du poste",
                    action: this.showComment,
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

    updateDateStart = (e) => {
        const occurrence = {...this.props.occurrence};
        occurrence.dateStart = e.target.value;
        this.props.setOccurrence(occurrence);
    }

    updateDateEnd = (e) => {
        const occurrence = {...this.props.occurrence};
        occurrence.dateEnd = e.target.value;
        this.props.setOccurrence(occurrence);
    }

    updateComment = (data) => {
        const occurrence = {...this.props.occurrence};
        occurrence.experience.comment = data;
        this.props.setOccurrence(occurrence);
    }

    updateExperienceValue = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        const occurrence = {...this.props.occurrence};
        occurrence.experience[key] = value;
        this.props.setOccurrence(occurrence);
    }

    updateEnterpriseValue = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        const occurrence = {...this.props.occurrence};
        occurrence.experience.enterprise[key] = value;
        this.props.setOccurrence(occurrence);
    }

    handleAddLink = (link) => {

        if (link != undefined && link != null) {

            const occurrence = {...this.props.occurrence};
            const {experience} = occurrence;
            const links = experience.links;
            links[links.length] = link;
            experience.links = links;

            this.props.setOccurrence(occurrence);
        }
    }

    handleEditLink = (key) => {

        if (key != undefined && key != null) {

            const state = {...this.state};
            state.edit.link.key = key;
            this.setState(state);
        }
    }

    handleUpdateLink = (key, link) => {
        const occurrence = {...this.props.occurrence};
        const state = {...this.state};

        occurrence.experience.links[key] = link;
        state.edit.link.key = null;

        this.setState(state);
        this.props.setOccurrence(occurrence);
    }

    handleDeleteLink = (key) => {
        const occurrence = {...this.props.occurrence};
        occurrence.experience.links[key] = null;
        this.props.setOccurrence(occurrence);
    }

    handleEditTechnology = (key) => {

        if (key !== undefined && key !== null) {
            const {edit, setEdit} = this.props;
            if (key != edit.experience.technology.key) {
                const newEdit = {...edit};
                newEdit.experience.technology.key = key;
                setEdit(newEdit);
            }
        }
    }

    handleDeleteTechnology = (key) => {
        const occurrence = {...this.props.occurrence};
        occurrence.experience.technologicalCategories[key] = null;
        this.props.setOccurrence(occurrence);
    }

    handleSave = (e) => {
        e.preventDefault();
        const newState = {...this.state};
        const {occurrence,token} = this.props;
        const occurrenceDAO = daoFactory.getOccurrenceDAO();

        console.log(this.props);

        if(occurrence["@id"] != undefined && occurrence["@id"] != null && occurrence["@id"] != ""){
            occurrenceDAO.update(occurrence,token).then((res)=>{
                console.log(res);
                this.reset();
            });
        }else{
            occurrenceDAO.insert(occurrence,token).then((res) => {
                console.log(res);
                this.reset();
            });

        }
    }

    reset = () => {
        this.resetState();
        this.resetOccurrence();
    }

    resetOccurrence = () => {
        const enterprise = new Enterprise(null, null, null, null, null, null)
        const experience = new Experience(null, null, null, enterprise, [], false, []);
        const occurrence = new Occurrence(null, null, null, experience);

        this.props.setOccurence(occurrence);
    }

    resetState = () => {
        const state = {...this.state};

        state.edit.technology.key = null;
        state.edit.link.key = null;

        this.resetAllStyleDisplay(state);
        state.style.enterprise.display = "block";

        this.setState(state);
    }

    resetAllStyleDisplay = (state) => {
        const styleKeys = Object.keys(state.style);
        styleKeys.map((key) => {
            state.style[key].display = "none";
        });
    }

    normalizerDateEdit(date) {
        let result = "";
        if (date !== undefined && date !== null && !(date instanceof Date)) {
            result = new Date(date);
            result = result.toISOString().split("T")[0];
        } else if (date instanceof Date) {
            result = date.toISOString().split("T")[0];
        }
        return result;
    }

    showExperience = (e) => {
        e.preventDefault();
        const state = {...this.state};

        this.resetAllStyleDisplay(state);
        state.style.experience.display = "block";

        this.setState(state);
    }

    showEnterprise = (e) => {
        e.preventDefault();
        const state = {...this.state};

        this.resetAllStyleDisplay(state);
        state.style.enterprise.display = "block";

        this.setState(state);
    }

    showComment = (e) => {
        e.preventDefault();
        const state = {...this.state};

        this.resetAllStyleDisplay(state);
        state.style.comment.display = "block";

        this.setState(state);
    }

    showMoreInformation = (e) => {
        e.preventDefault();
        const state = {...this.state};

        this.resetAllStyleDisplay(state);
        state.style.moreInformation.display = "block";

        this.setState(state);
    }

    showValidate = (e) => {
        e.preventDefault();
        const state = {...this.state};

        this.resetAllStyleDisplay(state);
        state.style.validate.display = "block";

        this.setState(state);
    }


    renderLinks() {
        const {links} = this.props.occurrence.experience;
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
        let link = null;
        if (key) {
            link = this.props.occurrence.experience.links[key];
        }

        return (
            <EditLink
                keyLink={key}
                link={link}
                handleAddLink={this.handleAddLink}
                handleUpdateLink={this.handleUpdateLink}
            />
        );
    }

    renderEditTechnologies() {
        return (
            <EditTechnologicalCategory/>
        );
    }

    renderTechnologies() {
        const {technologicalCategories} = this.props.occurrence.experience;
        if (technologicalCategories != undefined && technologicalCategories != null) {
            const technologiesKeys = Object.keys(technologicalCategories);

            return technologiesKeys.map((key) => {
                const technology = technologicalCategories[key];
                if (technology != null) {
                    return (
                        <div key={key} className={"col-auto"}>
                            <div className={"m-1 row border"}>

                                <div className={"col-auto p-1 text-center"}>
                                    <button
                                        className={"btn btn-light p-3 text-left"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.handleEditTechnology(key);
                                        }}
                                    >
                                        {technology.name}
                                        <div className={"small"}>{technology.logo}</div>
                                    </button>
                                </div>

                                <div className={"col-auto p-1 text-center"}>
                                    <button
                                        className={"col-12 btn btn-danger h-100 pl-1 pr-1"}
                                        onClick={() => this.handleDeleteTechnology(key)}
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
    }

    renderExperienceForm() {
        const {occurrence} = this.props;
        const {dateStart, dateEnd, experience} = occurrence;
        const {name, comment, enterprise, technologicalCategories, workstudy, links} = experience;
        const occurrenceValidate = {...occurrence};
        if (!(occurrenceValidate.dateEnd instanceof Date) && occurrenceValidate.dateEnd != "") {
            occurrenceValidate.dateEnd = new Date(occurrenceValidate.dateEnd);
        }
        if (!(occurrenceValidate.dateStart instanceof Date) && occurrenceValidate.dateStart != "") {
            occurrenceValidate.dateStart = new Date(occurrenceValidate.dateStart);
        }

        return (
            <div>

                <Form>

                    <div style={{
                        display: this.state.style.experience.display
                    }}>
                        <h3>Expérience Professionnelle</h3>

                        <div className={"row"}>
                            <div className={"col-6 col-xl-3"}>
                                <FormGroup>
                                    <Form.Label>Logo</Form.Label>
                                    <Form.File label={""} custom/>
                                </FormGroup>
                            </div>
                            <div className={"col-12 col-xl-3"}>
                                <FormGroup>
                                    <Form.Label>Date de début</Form.Label>
                                    <Form.Control
                                        type={"date"}
                                        value={this.normalizerDateEdit(dateStart)}
                                        onChange={this.updateDateStart}
                                    />
                                </FormGroup>
                            </div>
                            <div className={"col-12 col-xl-3"}>
                                <FormGroup>
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control
                                        type={"date"}
                                        value={this.normalizerDateEdit(dateEnd)}
                                        onChange={this.updateDateEnd}
                                    />
                                </FormGroup>
                            </div>
                            <div className={"col-12 col-xl-2"}>
                                <FormGroup>
                                    <Form.Label>Intitulé du poste</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"name"}
                                        value={experience.name}
                                        onChange={this.updateExperienceValue}
                                    />
                                </FormGroup>
                            </div>

                        </div>
                    </div>


                    <div style={{
                        display: this.state.style.enterprise.display
                    }}>

                        <h3>Entreprise</h3>

                        <div className={"row"}>

                            <div className={"col-12 col-xl-3"}>
                                <FormGroup>
                                    <Form.Label>Logo</Form.Label>
                                    <Form.File label={""} custom/>
                                </FormGroup>
                            </div>

                            <div className={"col-12 col-xl-9"}>
                                <FormGroup>
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"name"}
                                        value={enterprise.name}
                                        onChange={this.updateEnterpriseValue}
                                    />
                                </FormGroup>
                            </div>

                            <div className={"col-12 col-xl-6"}>
                                <FormGroup>
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"address"}
                                        value={enterprise.address}
                                        onChange={this.updateEnterpriseValue}
                                    />
                                </FormGroup>
                            </div>
                            <div className={"col-12 col-xl-2"}>
                                <FormGroup>
                                    <Form.Label>Code Postale</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"postalCode"}
                                        value={enterprise.postalCode}
                                        onChange={this.updateEnterpriseValue}
                                    />
                                </FormGroup>
                            </div>
                            <div className={"col-12 col-xl-4"}>
                                <FormGroup>
                                    <Form.Label>Ville</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"city"}
                                        value={enterprise.city}
                                        onChange={this.updateEnterpriseValue}
                                    />
                                </FormGroup>
                            </div>
                        </div>

                    </div>

                    <div style={{
                        display: this.state.style.comment.display
                    }}>

                        <h3>Résumé du poste</h3>
                        <Form.Group>
                            <CKEditor
                                editor={ClassicEditor}
                                data={experience && experience.comment ? experience.comment : ""}
                                onInit={editor => {
                                    let data = "";
                                    if (experience != undefined && experience != null) {
                                        if (experience.comment != undefined && experience.comment != null) {
                                            data = experience.comment;
                                        }
                                    }
                                    editor.setData(data);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.updateComment(data);
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

                    <div className={"row"}>
                        <div className={"col-6 border border-top-0 border-left-0 border-bottom-0"}>
                            <h3>Technologies</h3>
                            <div className={"row"}>

                                <div className={"col-12"}>
                                    {this.renderEditTechnologies()}
                                </div>

                                <div className={"col-12"}>
                                    <div className={"row"}>
                                        {this.renderTechnologies()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-6"}>
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
        );
    }

    renderProgressBar() {
        const {steps} = this.state;
        return (
            <ProgressBar steps={steps}/>
        );
    }

    render() {
        return (
            <div>

                <div className={"col-12 mt-4 mb-4"}>
                    {this.renderProgressBar()}
                </div>

                <div className={"col-12"}>
                    {this.renderExperienceForm()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {occurrence, edit} = state.OccurrencesReducer;
    const {token} = state.AuthentificationReducer;
    return {
        occurrence,
        edit,
        token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOccurrence: (occurrence) => dispatch(actions.occurrences.setOccurrence(occurrence)),
        setEdit: (edit) => dispatch(actions.occurrences.setEdit(edit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExperience);