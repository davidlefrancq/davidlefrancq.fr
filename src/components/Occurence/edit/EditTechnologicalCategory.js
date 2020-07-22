import React, {Component} from 'react';
import TechnologicalCategorie from "../../../bo/TechnologicalCategorie";
import {Col, Form} from "react-bootstrap";
import {FaSave} from "react-icons/fa";
import {connect} from "react-redux";
import {actions} from "../../../actions";

class EditTechnologicalCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: null,
            technology: new TechnologicalCategorie("", ""),
        }
    }

    handleAdd = (e) => {

        e.preventDefault();
        const {key} = this.state;

        if (key != undefined && key != null) {
            this.add();
        } else {
            this.update();
        }
    }

    /**
     * Ajouter une techno
     */
    add = () => {

        const {key, technology} = this.state;
        const {occurence, setOccurence, setEdit,edit} = this.props;

        // Ajout de la Tech à l'occurence
        const newOccurence = {...occurence};
        const {technologicalCategories} = newOccurence.experience;
        technologicalCategories[key] = technology;
        setOccurence(newOccurence);

        // RAZ le l'état du composant d'édition
        this.reset();

        // Raz du target d'edition Technology
        const newEdit = {...edit};
        newEdit.experience.technology.key = null;
        setEdit(newEdit);
    }

    /**
     * MAJ d'une techno
     */
    update = () => {

        const {technology} = this.state;
        const {occurence, setOccurence, setEdit,edit} = this.props;
        const newOccurence = {...occurence};
        const {technologicalCategories} = newOccurence.experience;

        // Ajout de la Tech à l'occurence
        const i = technologicalCategories.length;
        technologicalCategories[i] = technology;
        setOccurence(newOccurence);

        // RAZ le l'état du composant d'édition
        this.reset();
    }

    /**
     * RAZ de létat du composant
     */
    reset(){
        this.setState({
            technology: new TechnologicalCategorie("", ""),
            key: null,
        });
    }

    handleChange = (e) => {
        const {id, value} = e.target;
        const state = {...this.state};

        state.technology[id] = value;

        this.setState(state);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {edit, occurence} = this.props;
        const {key} = edit.experience.technology;

        if (key != null) {
            if (key != this.state.key) {

                const state = {...this.state};
                const {technologicalCategories} = occurence.experience;

                state.technology = technologicalCategories[key];
                state.key = key;

                this.setState(state);
            }
        }
    }

    render() {

        return (
            <Form>

                <Form.Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="linkInput" srOnly>Logo</Form.Label>
                        <Form.Control
                            id={"logo"}
                            type="text"
                            placeholder="url image"
                            value={this.state.technology.logo}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs="auto">
                        <Form.Label htmlFor="linkInput" srOnly>Nom</Form.Label>
                        <Form.Control
                            id={"name"}
                            type="text"
                            placeholder="ex: Google"
                            value={this.state.technology.name}
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

const mapStateToProps = (state) => {
    const {occurence, edit} = state.OccurencesReducer;
    return {
        occurence,
        edit,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        setOccurence: (occurence) => dispatch(actions.occurences.setOccurence(occurence)),
        setEdit: (edit) => dispatch(actions.occurences.setEdit(edit)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTechnologicalCategory);