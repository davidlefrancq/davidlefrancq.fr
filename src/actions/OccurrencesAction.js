import {
    SET_OCCURRENCES,
    SET_TARGET_DATE,
    SET_OCCURRENCE,
    ADD_OCCURRENCE,
    SET_OCCURRENCE_EDIT,
    SET_YEAR
} from "./occurrence-action-type";

class OccurrencesAction {

    static setOccurrences(occurrences) {
        return {
            type: SET_OCCURRENCES,
            payload: occurrences,
        };
    }

    static setOccurrencesDateTargeted(date) {
        return {
            type: SET_TARGET_DATE,
            payload: date,
        };
    }

    static setOccurrence(occurrence) {
        return {
            type: SET_OCCURRENCE,
            payload: occurrence,
        };
    }

    static addOccurrence(occurrence){
        return{
            type: ADD_OCCURRENCE,
            payload: occurrence,
        }
    }

    static setEdit(edit){
        return{
            type: SET_OCCURRENCE_EDIT,
            payload: edit,
        }
    }

    static setYear(year){
        return{
            type: SET_YEAR,
            payload: year,
        };
    }
}

export default OccurrencesAction;