import axios from "axios";
import Occurence from "../bo/Occurence";
import Enterprise from "../bo/Enterprise";
import Experience from "../bo/Experience";

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
        const headers = {
            'Content-Type': 'application/json',
        }
        const data = JSON.stringify(this.prepareUpdate(occurence));
        const id = occurence.id;
        const urlRequest = UPDATE.replace('{id}', id);
        return axios.put(urlRequest, data, {headers});
    }

    prepareUpdate(data) {
        const occurence = {...data};
        this.prepareOccurence(occurence);
        return occurence;
    }

    prepareOccurence(occurence) {
        if (occurence["@id"] != undefined && occurence["@id"] != null && occurence["@id"] != "") {
            occurence.id = occurence["@id"];
        }
        this.prepareExperience(occurence);
        this.prepareQualification(occurence);

    }

    prepareExperience(occurence) {
        if (occurence.experience != undefined && occurence.experience != null && occurence.experience != "") {
            if (occurence.experience["@id"] != undefined && occurence.experience["@id"] != null && occurence.experience["@id"] != "") {
                occurence.experience.id = occurence.experience["@id"];
            }
            this.prepareEnterprise(occurence.experience.enterprise);
            this.prepareTechnologicalCategories(occurence.experience.technologicalCategories);
            this.prepareLinks(occurence.experience.links);
        }
    }

    prepareQualification(occurence) {
        if (occurence.qualification != undefined && occurence.qualification != null && occurence.qualification != "") {
            if (occurence.qualification["@id"] != undefined && occurence.qualification["@id"] != null && occurence.qualification["@id"] != "") {
                occurence.qualification.id = occurence.qualification["@id"];
            }
            this.prepareTrainingCenter(occurence.qualification.trainingCenter);
            this.prepareJobs(occurence.qualification.jobs);
            this.prepareLinks(occurence.qualification.links);
        }
    }

    prepareTrainingCenter(trainingCenter) {
        if (trainingCenter != undefined && trainingCenter != null && trainingCenter != "") {
            if (trainingCenter["@id"] != undefined && trainingCenter["@id"] != null && trainingCenter["@id"] != "") {
                trainingCenter.id = trainingCenter['@id'];
            }
        }
    }


    prepareLinks(links) {
        if (links != undefined && links != null && links != "") {
            const keys = Object.keys(links);
            keys.map((key) => {
                if (links[key]["@id"] != undefined && links[key]["@id"] != null && links[key]["@id"] != "") {
                    links[key].id = links[key]["@id"];
                }
            });
        }
    }

    prepareJobs(jobs) {
        if (jobs != undefined && jobs != null && jobs != "") {
            const keys = Object.keys(jobs);
            keys.map((key) => {
                if (jobs[key]["@id"] != undefined && jobs[key]["@id"] != null && jobs[key]["@id"] != "") {
                    jobs[key].id = jobs[key]["@id"];
                }
            });
        }
    }

    prepareEnterprise(enterprise) {
        if (enterprise != undefined && enterprise != null && enterprise != "") {
            if (enterprise["@id"] != undefined && enterprise["@id"] != null && enterprise["@id"] != "") {
                enterprise.id = enterprise['@id'];
            }
        }
    }

    prepareTechnologicalCategories(technologicalCategories) {
        if (technologicalCategories != undefined && technologicalCategories != null && technologicalCategories != "") {
            const keys = Object.keys(technologicalCategories);
            keys.map((key) => {
                if (technologicalCategories[key]["@id"] != undefined && technologicalCategories[key]["@id"] != null && technologicalCategories[key]["@id"] != "") {
                    technologicalCategories[key].id = technologicalCategories[key]["@id"];
                }
            });
        }
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