import {SET_AUTHENTIFICATION} from "../actions/authentification-action-type";

const initialState = {
    isLoggedIn: false,
};

export default function AuthentificationReducer(state = initialState, action) {

    switch (action.type) {

        case SET_AUTHENTIFICATION:
            return {
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
}