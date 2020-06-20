import {SET_QUALIFICATION_LIST, SET_QUALIFICATION_SELECTED} from "./qualification-action-type";

class QualificationAction {

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