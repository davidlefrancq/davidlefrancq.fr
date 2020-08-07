import axios from "axios";
import {URL_LOGIN} from "./server-url";

class AuthenticationDAO {

    login(email, password) {
        const headers = {
            'Content-Type': 'application/json',
        }
        const body = {
            'email': email,
            'password': password
        };
        const data = JSON.stringify(body);
        return axios.post(URL_LOGIN, data, {headers});
    }
}

export default AuthenticationDAO;