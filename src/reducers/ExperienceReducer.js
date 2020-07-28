import {SET_EXPERIENCE_LIST, SET_EXPERIENCE_SELECTED} from "../actions/experience-action-type";

const initialState = {
    occurrences: {},
    selected: 0,
};

export default function ExperienceReducer(state = initialState, action) {

    switch (action.type) {
        case SET_EXPERIENCE_SELECTED:
            const {occurrences} = state;
            return {
                occurrences,
                selected: action.payload,
            }

        case SET_EXPERIENCE_LIST:
            const {selected} = state;
            return {
                occurrences: action.payload,
                selected,
            };

        default:
            return state;
    }
}