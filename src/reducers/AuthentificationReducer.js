import {SET_AUTHENTIFICATION, SET_TOKEN} from "../actions/authentification-action-type";

const initialState = {
    isLoggedIn: false,
    token: null,
};

export default function AuthentificationReducer(state = initialState, action) {

    const newState = {...state};

    switch (action.type) {

        case SET_AUTHENTIFICATION:
            newState.isLoggedIn = action.payload;
            return newState;

        case SET_TOKEN:
            newState.token = action.payload;
            return newState;

        default:
            return state;
    }
}