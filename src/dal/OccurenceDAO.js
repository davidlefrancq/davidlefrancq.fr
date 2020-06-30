import axios from "axios";

const URL_SERVER = "http://localhost:8000";
const SELECT_ALL = URL_SERVER + "/api/occurences";
const SELECT_BY_ID = URL_SERVER + "/api/occurences";
const INSERT = URL_SERVER + "/api/occurences";
const UPDATE = URL_SERVER + "/api/occurences/{id}";
const DELETE = URL_SERVER + "/api/occurences/{id}";

class OccurenceDAO {

    selectAll() {
        return axios.get(SELECT_ALL);
    }

    selectById(id) {
        if (id != undefined && id != null) {
            const urlRequest = SELECT_BY_ID.replace('{id}', id);
            return axios.get(urlRequest);
        }
    }

    insert(occurence) {
        if (occurence != undefined && occurence != null) {
            const headers = {
                'Content-Type': 'application/json',
            }
            const data = JSON.stringify(occurence);
            return axios.post(INSERT, data, {headers});
        }
    }

    update(occurence) {
    }

    delete(occurence) {
        if (occurence != undefined && occurence != null) {
            const headers = {
                'Content-Type': 'application/json',
            }
            const {id} = occurence;
            const urlRequest = DELETE.replace('{id}', id);
            return axios.delete(urlRequest, {headers});
        }
    }

}

export default OccurenceDAO;