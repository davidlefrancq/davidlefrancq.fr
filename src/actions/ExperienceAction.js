import {SET_EXPERIENCE_LIST, SET_EXPERIENCE_SELECTED} from "./experience-action-type";

class ExperienceAction {

    static setExperienceList(occurences) {
        return {
            type: SET_EXPERIENCE_LIST,
            payload: occurences,
        };
    }

    static setExperienceSelected(id) {
        return {
            type: SET_EXPERIENCE_SELECTED,
            payload: id,
        };
    }
}

export default ExperienceAction;