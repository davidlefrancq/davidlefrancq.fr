import {SET_OCCURENCES, SET_TARGET_DATE, SET_OCCURENCE} from "./occurence-action-type";

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
}

export default OccurencesAction;