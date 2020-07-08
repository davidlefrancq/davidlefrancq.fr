import axios from "axios";
import {URL_LOGIN} from "./server-url";

class AuthenticationDAO {

    login(email, password) {
        console.log("URL_LOGIN",URL_LOGIN);
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