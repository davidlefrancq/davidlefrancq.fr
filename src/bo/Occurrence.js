class Occurrence {

    constructor(dateStart, dateEnd, qualification, experience) {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.qualification = qualification;
        this.experience = experience;
    }

    getDateStart() {
        return this.dateStart;
    }

    setDateStart(value) {
        this.dateStart = value;
    }

    getDateEnd() {
        return this.dateEnd;
    }

    setDateEnd(value) {
        this.dateEnd = value;
    }

    getSualification() {
        return this.qualification;
    }

    setQualification(value) {
        this.qualification = value;
    }

    getExperience() {
        return this.experience;
    }

    setExperience(value) {
        this.experience = value;
    }
}

export default Occurrence;