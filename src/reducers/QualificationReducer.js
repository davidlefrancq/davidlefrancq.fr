import {SET_QUALIFICATION_LIST, SET_QUALIFICATION_SELECTED} from "../actions/qualification-action-type";

const initialState = {
    occurrences: {},
    selected: 0,
};

export default function QualificationReducer(state = initialState, action) {

    switch (action.type) {

        case SET_QUALIFICATION_SELECTED:
            const {occurrences} = state;
            return {
                occurrences,
                selected: action.payload,
            }

        case SET_QUALIFICATION_LIST:

            const {selected} = state;
            return {
                occurrences: action.payload,
                selected,
            };

        default:
            return state;
    }
}