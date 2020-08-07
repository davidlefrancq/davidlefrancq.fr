import {SET_EXPERIENCE, SET_EXPERIENCE_LIST, SET_EXPERIENCE_SELECTED} from "../actions/experience-action-type";

const initialState = {
    occurrences: {},
    occurrence: null,
    selected: 0,
};

export default function ExperienceReducer(state = initialState, action) {

    const {occurrences, occurrence, selected} = state;

    switch (action.type) {
        case SET_EXPERIENCE:
            return {
                occurrences,
                occurrence: action.payload,
                selected,
            }

        case SET_EXPERIENCE_SELECTED:
            return {
                occurrences,
                occurrence,
                selected: action.payload,
            }

        case SET_EXPERIENCE_LIST:
            return {
                occurrences: action.payload,
                occurrence,
                selected,
            };

        default:
            return state;
    }
}