import {SET_AUTHENTIFICATION, SET_TOKEN} from "./authentification-action-type";

class AuthentificationAction {

    static setAuthentification(isLoggedIn) {
        return {
            type: SET_AUTHENTIFICATION,
            payload: isLoggedIn,
        };
    }

    static setToken(token) {
        return {
            type: SET_TOKEN,
            payload: token,
        };
    }

}

export default AuthentificationAction;