import {readRemoteFile} from "react-papaparse";
import cv from "../data/CV.csv";
import DataConverter from "./DataConverter";

class OccurrenceDAO {

    selectAll() {
        return this.selectAllByCsv();
    }

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
}

export default OccurrenceDAO;
