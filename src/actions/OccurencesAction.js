import {
    SET_OCCURENCES,
    SET_TARGET_DATE,
    SET_OCCURENCE,
    ADD_OCCURENCE,
    SET_OCCURENCE_EDIT
} from "./occurence-action-type";

class OccurencesAction {

    static setOccurences(occurences) {
        return {
            type: SET_OCCURENCES,
            payload: occurences,
        };
    }

    static setOccurencesDateTargeted(date) {
        return {
            type: SET_TARGET_DATE,
            payload: date,
        };
    }

    static setOccurence(occurence) {
        return {
            type: SET_OCCURENCE,
            payload: occurence,
        };
    }

    static addOccurence(occurence){
        return{
            type: ADD_OCCURENCE,
            payload: occurence,
        }
    }

    static setEdit(edit){
        return{
            type: SET_OCCURENCE_EDIT,
            payload: edit,
        }
    }
}

export default OccurencesAction;