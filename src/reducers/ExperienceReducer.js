import {SET_EXPERIENCE_LIST, SET_EXPERIENCE_SELECTED} from "../actions/experience-action-type";

const initialState = {
    occurences: {},
    selected: 0,
};

export default function ExperienceReducer(state = initialState, action) {

    switch (action.type) {
        case SET_EXPERIENCE_SELECTED:
            const {occurences} = state;
            return {
                occurences,
                selected: action.payload,
            }

        case SET_EXPERIENCE_LIST:
            const {selected} = state;
            return {
                occurences: action.payload,
                selected,
            };

        default:
            return state;
    }
}