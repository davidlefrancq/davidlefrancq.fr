import {SET_QUALIFICATION_LIST, SET_QUALIFICATION_SELECTED} from "../actions/qualification-action-type";

const initialState = {
    occurences: {},
    selected: 0,
};

export default function QualificationReducer(state = initialState, action) {

    switch (action.type) {

        case SET_QUALIFICATION_SELECTED:
            const {occurences} = state;
            return {
                occurences,
                selected: action.payload,
            }

        case SET_QUALIFICATION_LIST:

            const {selected} = state;
            return {
                occurences: action.payload,
                selected,
            };

        default:
            return state;
    }
}