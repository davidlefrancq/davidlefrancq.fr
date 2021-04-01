import {
    SET_QUALIFICATION,
    SET_QUALIFICATION_LIST,
    // SET_QUALIFICATION_SELECTED
} from "../actions/qualification-action-type";

const initialState = {
    occurrences: {},
    occurrence: null,
    // selected: 0,
};

export default function QualificationReducer(state = initialState, action) {

    const {occurrences,occurrence,selected} = state;
    switch (action.type) {

        case SET_QUALIFICATION:
            return {
                occurrences,
                occurrence: action.payload,
                selected,
            }

        // case SET_QUALIFICATION_SELECTED:
        //     return {
        //         occurrences,
        //         occurrence,
        //         selected: action.payload,
        //     }

        case SET_QUALIFICATION_LIST:
            return {
                occurrences: action.payload,
                occurrence,
                selected,
            };

        default:
            return state;
    }
}