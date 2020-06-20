import {SET_OCCURENCE, SET_OCCURENCES, SET_TARGET_DATE} from "../actions/occurence-action-type";

const initialState = {
    occurences: {},
    occurence: null,
    target: {
        date: null,
    },
};

export default function OccurencesReducer(state = initialState, action) {

    const newState = {...state};

    switch (action.type) {

        case SET_OCCURENCES:
            newState.occurences = action.payload;
            return newState;

        case SET_OCCURENCE:
            newState.occurence = action.payload;
            return newState;

        case SET_TARGET_DATE:
            newState.date = action.payload;
            return newState;

        default:
            return state;
    }
}