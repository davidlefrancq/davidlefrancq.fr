import axios from "axios";
import {MEDIA_OBJECT_ADMIN, URL_OCCURRENCES, URL_OCCURRENCES_ADMIN} from "./server-url";
import {readRemoteFile} from "react-papaparse";
import cv from "../data/CV.csv";
import DataConverter from "./DataConverter";

const SELECT_ALL = URL_OCCURRENCES;
const SELECT_BY_ID = URL_OCCURRENCES + "/{id}";
const INSERT = URL_OCCURRENCES_ADMIN;
const UPDATE = URL_OCCURRENCES_ADMIN + "/{id}";
const DELETE = URL_OCCURRENCES_ADMIN + "/{id}";
const UPLOAD_IMAGE = MEDIA_OBJECT_ADMIN;

class OccurrenceDAO {

    selectAllByCsv() {
        return new Promise((resolve, reject) => {
            try {
                readRemoteFile(cv, {
                    delimiter: ";",
                    skipEmptyLines: true,
                    complete: (result) => {
                        const occurences = [];

                        const {data} = result;
                        for (const key in data) {

                            const item = data[key];
                            if (Number.parseInt(key) !== 0) {
                                const occurence = DataConverter.occurenceParser(item);
                                occurence.id = key;
                                occurences.push(occurence);
                            }
                        }

                        resolve(occurences);
                    },
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    selectAll() {
        return this.selectAllByCsv();
        //return axios.get(SELECT_ALL);
    }

    selectById(id) {
        if (id !== undefined && id !== null) {
            const urlRequest = SELECT_BY_ID.replace('{id}', id);
            return axios.get(urlRequest);
        }
    }

    insert(occurence, token) {

        if (occurence !== undefined && occurence !== null) {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            const data = JSON.stringify(occurence);
            return axios.post(INSERT, data, {headers});
        }
    }

    update(occurence, token) {
        const headers = {
            'Authorization': `Bearer ${token}`,
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
        if (occurence["@id"] !== undefined && occurence["@id"] !== null && occurence["@id"] !== "") {
            occurence.id = occurence["@id"];
        }
        this.prepareExperience(occurence);
        this.prepareQualification(occurence);

    }

    prepareExperience(occurence) {
        if (occurence.experience !== undefined && occurence.experience !== null && occurence.experience !== "") {
            if (occurence.experience["@id"] !== undefined && occurence.experience["@id"] !== null && occurence.experience["@id"] !== "") {
                occurence.experience.id = occurence.experience["@id"];
            }
            this.prepareEnterprise(occurence.experience.enterprise);
            this.prepareTechnologicalCategories(occurence.experience.technologicalCategories);
            this.prepareLinks(occurence.experience.links);
        }
    }

    prepareQualification(occurence) {
        if (occurence.qualification !== undefined && occurence.qualification !== null && occurence.qualification !== "") {
            if (occurence.qualification["@id"] !== undefined && occurence.qualification["@id"] !== null && occurence.qualification["@id"] !== "") {
                occurence.qualification.id = occurence.qualification["@id"];
            }
            this.prepareTrainingCenter(occurence.qualification.trainingCenter);
            this.prepareJobs(occurence.qualification.jobs);
            this.prepareLinks(occurence.qualification.links);
        }
    }

    prepareTrainingCenter(trainingCenter) {
        if (trainingCenter !== undefined && trainingCenter !== null && trainingCenter !== "") {
            if (trainingCenter["@id"] !== undefined && trainingCenter["@id"] !== null && trainingCenter["@id"] !== "") {
                trainingCenter.id = trainingCenter['@id'];
            }
        }
    }


    prepareLinks(links) {
        if (links !== undefined && links !== null && links !== "") {
            const keys = Object.keys(links);
            keys.map((key) => {
                if (links[key]["@id"] !== undefined && links[key]["@id"] !== null && links[key]["@id"] !== "") {
                    links[key].id = links[key]["@id"];
                }
            });
        }
    }

    prepareJobs(jobs) {
        if (jobs !== undefined && jobs !== null && jobs !== "") {
            for(const key in jobs){
                const job = jobs[key];
                if (job["@id"] !== undefined && job["@id"] !== null && job["@id"] !== "") {
                    job.id = job["@id"];
                }
            }
        }
    }

    prepareEnterprise(enterprise) {
        if (enterprise !== undefined && enterprise !== null && enterprise !== "") {
            if (enterprise["@id"] !== undefined && enterprise["@id"] !== null && enterprise["@id"] !== "") {
                enterprise.id = enterprise['@id'];
            }
        }
    }

    prepareTechnologicalCategories(technologicalCategories) {
        if (technologicalCategories !== undefined && technologicalCategories !== null && technologicalCategories !== "") {
            for(const key in technologicalCategories){
                const technological = technologicalCategories[key];
                if (technological["@id"] !== undefined && technological["@id"] !== null && technological["@id"] !== "") {
                    technological.id = technological["@id"];
                }
            }
        }
    }

    delete(occurence, token) {
        if (occurence !== undefined && occurence !== null) {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            const {id} = occurence;
            const urlRequest = DELETE.replace('{id}', id);
            return axios.delete(urlRequest, {headers});
        }
    }

    uploadImage(file, token) {

        const data = new FormData()
        data.append('file', file)

        if (file !== undefined && file !== null) {
            const headers = {
                'Authorization': `Bearer ${token}`,
            }
            return axios.post(UPLOAD_IMAGE, data, {headers});
        }
    }
}

export default OccurrenceDAO;
