import {SET_QUALIFICATION, SET_QUALIFICATION_LIST, SET_QUALIFICATION_SELECTED} from "./qualification-action-type";

class QualificationAction {

    static setQualification(occurence) {
        return {
            type: SET_QUALIFICATION,
            payload: occurence,
        };
    }

    static setQualificationList(occurences) {
        return {
            type: SET_QUALIFICATION_LIST,
            payload: occurences,
        };
    }

    static setQualificationSelected(id) {
        return {
            type: SET_QUALIFICATION_SELECTED,
            payload: id,
        };
    }
}

export default QualificationAction;