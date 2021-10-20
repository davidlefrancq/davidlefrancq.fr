class Occurrence {

    constructor(dateStart, dateEnd, qualification, experience) {
        this.id = 0;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.qualification = qualification;
        this.experience = experience;
    }

    compare(occurrence) {
        let result = true;

        if (this.id !== occurrence.id) {
            result = false;
        }

        if (this.dateStart !== occurrence.dateStart) {
            result = false;
        }

        if (this.dateEnd !== occurrence.dateEnd) {
            result = false;
        }

        if (this.experience != null) {
            if (!this.experience.compare(occurrence.experience)) {
                result = false;
            }
        }

        if (this.qualification != null) {
            if (!this.qualification.compare(occurrence.qualification)) {
                result = false;
            }
        }

        return result;
    }

    static getYear(occurrence){
        let year = null;

        if(occurrence !== undefined && occurrence !== null){
            if(occurrence.dateEnd !== undefined && occurrence.dateEnd !== null){
                year = eval(new Date(occurrence.dateEnd).getFullYear());
            }else if(occurrence.dateStart !== undefined && occurrence.dateStart !== null){
                year = eval(new Date(occurrence.dateStart).getFullYear());
            }
        }

        return year;
    }

    static lightCompare(occurrence1, occurrence2){
        let result = true;

        if (occurrence1.id !== occurrence2.id) {
            result = false;
        }

        if (occurrence1.dateStart !== occurrence2.dateStart) {
            result = false;
        }

        if (occurrence1.dateEnd !== occurrence2.dateEnd) {
            result = false;
        }

        if (Occurrence.isExperience(occurrence1)) {
            if (!Occurrence.isExperience(occurrence2)) {
                result = false;
            }
        }else{
            if(Occurrence.isExperience(occurrence2)){
                result = false;
            }
        }

        if (Occurrence.isQualification(occurrence1)) {
            if (!Occurrence.isQualification(occurrence2)) {
                result = false;
            }
        }else{
            if(Occurrence.isQualification(occurrence2)){
                result = false;
            }
        }

        return result;
    }

    static isExperience(occurrence) {
        let isExperience = false;

        if (occurrence !== undefined && occurrence !== null) {
            if (occurrence.experience !== undefined && occurrence.experience !== null) {
                isExperience = true;
            }
        }

        return isExperience;
    }

    static isQualification(occurrence) {
        let isQualification = false;

        if (occurrence !== undefined && occurrence !== null) {
            if (occurrence.qualification !== undefined && occurrence.qualification !== null) {
                isQualification = true;
            }
        }

        return isQualification;
    }
}

export default Occurrence;
