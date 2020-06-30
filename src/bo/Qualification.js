class Qualification {

    constructor(name,img,level,trainingCenter,objectives,jobs,links) {
        this.name = name;
        this.img = img;
        this.level = level;
        this.trainingCenter = trainingCenter;
        this.objectives = objectives;
        this.jobs = jobs;
        this.links = links;
    }


    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getImg() {
        return this.img;
    }

    setImg(value) {
        this.img = value;
    }

    getLevel() {
        return this.level;
    }

    setLevel(value) {
        this.level = value;
    }

    getTrainingCenter() {
        return this.trainingCenter;
    }

    setTrainingCenter(value) {
        this.trainingCenter = value;
    }

    getObjectives() {
        return this.objectives;
    }

    setObjectives(value) {
        this.objectives = value;
    }

    getJobs() {
        return this.jobs;
    }

    setJobs(value) {
        this.jobs = value;
    }

    getLinks() {
        return this.links;
    }

    setLinks(value) {
        this.links = value;
    }
}

export default Qualification;