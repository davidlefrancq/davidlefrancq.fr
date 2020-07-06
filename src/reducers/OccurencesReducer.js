import {
    ADD_OCCURENCE,
    SET_OCCURENCE,
    SET_OCCURENCE_EDIT,
    SET_OCCURENCES,
    SET_TARGET_DATE
} from "../actions/occurence-action-type";

const initialState = {
    occurences: {},
    occurence: null,
    target: {
        date: null,
        oldDate: null,
    },
    edit: {
        qualification: {
            technology: {
                key: null,
            },
            link: {
                key: null,
            },
        },
        experience: {
            technology: {
                key: null,
            },
            link: {
                key: null,
            },
        }
    }
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
            newState.target.oldDate = newState.target.date;
            newState.target.date = action.payload;
            return newState;

        case ADD_OCCURENCE:
            newState.occurences.push(action.payload);
            return newState;

        case SET_OCCURENCE_EDIT:
            newState.edit = action.payload;
            return newState;

        default:
            return state;
    }
}