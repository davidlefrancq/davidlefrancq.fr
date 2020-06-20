import {SET_AUTHENTIFICATION} from "./authentification-action-type";

class AuthentificationAction {

    static setAuthentification(isLoggedIn) {
        return {
            type: SET_AUTHENTIFICATION,
            payload: isLoggedIn,
        };
    }

}

export default AuthentificationAction;