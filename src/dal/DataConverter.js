import TechnologicalCategory from "../bo/TechnologicalCategory";
import Link from "../bo/Link";
import Enterprise from "../bo/Enterprise";
import Experience from "../bo/Experience";
import TrainingCenter from "../bo/TrainingCenter";
import Qualification from "../bo/Qualification";
import Job from "../bo/Job";
import Occurrence from "../bo/Occurrence";

class DataConverter {

    static occurenceParser(data) {

        const dateStart = this.dateParser(data[0]);
        let dateEnd = this.dateParser(data[1]);
        if (!dateEnd || dateEnd === "") {
            dateEnd = this.qualificationFinalDate(data);
        }
        const occurence = new Occurrence(dateStart, dateEnd, null, null);
        switch (data[2]) {
            case "qualification":
                occurence.qualification = DataConverter.qualificationParser(data);
                break;
            case "experience":
                occurence.experience = DataConverter.experienceParser(data);
                break;
            default:

        }
        return occurence;
    }

    static qualificationFinalDate(data) {
        let result = "";

        if (data[2] === "qualification") {

            let dateEnd = this.dateParser(data[1]);
            if (!dateEnd && dateEnd !== "") {

                const date = new Date(Date.now());

                const fullYear = date.getFullYear();

                let month = date.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month.toString();
                }

                let day = date.getDate();
                if (day < 10) {
                    day = "0" + day.toString();
                }

                const dateString = `${fullYear}-${month}-${day}T00:00:00+00:00`;
                result = dateString;
            }
        }
        return result
    }

    static dateParser(data) {
        let result = null;
        if (data && data !== "") {
            const dateSplited = data.split("/")
            result = `${dateSplited[2]}-${dateSplited[1]}-${dateSplited[0]}T00:00:00+00:00`;
        }
        return result;
    }

    static qualificationParser(data) {
        const trainingCenter = this.trainingCenterParser(data);
        const links = this.linksParser(data[5]);
        const jobs = this.jobsParser(data[16]);
        const categories = this.technologicalCategoriesParser(data[26]);
        const qualification = new Qualification(data[3], data[4], data[14], trainingCenter, data[15], jobs, links, categories);
        return qualification;
    }

    static jobsParser(data) {
        if (data && data !== "") {
            return data.split(";").map((item) => {
                return new Job(item.trim());
            });
        }
    }

    static trainingCenterParser(data) {
        return new TrainingCenter(data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13]);
    }

    static experienceParser(data) {
        const enterprise = this.enterpriseParser(data);
        const links = this.linksParser(data[5]);
        const categories = this.technologicalCategoriesParser(data[26]);
        const experience = new Experience(data[3], data[17], data[4], enterprise, categories, data[27], links);
        return experience;
    }

    static enterpriseParser(data) {
        return new Enterprise(data[18], data[19], data[20], data[21], data[22], data[23], data[24], data[25]);
    }

    static linksParser(data) {
        if (data) {
            return data.split(";").map((linkData) => {
                const name = linkData.split("=")[0];
                const url = linkData.split("=")[1];
                const linkObj = new Link(name.trim(), url.trim());
                return linkObj;
            });
        }
    }

    static technologicalCategoriesParser(data) {
        const categories = [];

        if (data && data !== "") {
            const dataCategories = data.split(";");
            console.log("---");
            console.log(data);
            console.log(dataCategories);
            for (const key in dataCategories) {
                const dataCategory = dataCategories[key].split(',');
                console.log(dataCategory);
                const name = dataCategory[0].split("=")[1];
                const logo = dataCategory[1].split("=")[1];
                const category = new TechnologicalCategory(name, logo);
                categories.push(category);
            }
        }
        return categories;
    }
}

export default DataConverter;
