import {
    ADD_OCCURRENCE,
    SET_OCCURRENCE,
    SET_OCCURRENCE_EDIT,
    SET_OCCURRENCES,
    SET_TARGET_DATE
} from "../actions/occurrence-action-type";

const initialState = {
    occurrences: {},
    occurrence: null,
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

export default function OccurrencesReducer(state = initialState, action) {

    const newState = {...state};

    switch (action.type) {

        case SET_OCCURRENCES:
            newState.occurrences = action.payload;
            return newState;

        case SET_OCCURRENCE:
            newState.occurrence = action.payload;
            return newState;

        case SET_TARGET_DATE:
            newState.target.oldDate = newState.target.date;
            newState.target.date = action.payload;
            return newState;

        case ADD_OCCURRENCE:
            newState.occurrences.push(action.payload);
            return newState;

        case SET_OCCURRENCE_EDIT:
            newState.edit = action.payload;
            return newState;

        default:
            return state;
    }
}