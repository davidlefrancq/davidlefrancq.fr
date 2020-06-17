class Experience {

    constructor(jobTitle, comment, img, enterprise, technologicalCategories, workstudy, links) {

        this.jobTitle = jobTitle;
        this.comment = comment;
        this.img = img;
        this.enterprise = enterprise;
        this.technologicalCategories = technologicalCategories;
        this.workstudy = workstudy;
        this.links = links;
    }


    getJobTitle() {
        return this.jobTitle;
    }

    setJobTitle(value) {
        this.jobTitle = value;
    }

    getComment() {
        return this.comment;
    }

    setComment(value) {
        this.comment = value;
    }

    getImg() {
        return this.img;
    }

    setImg(value) {
        this.img = value;
    }

    getEnterprise() {
        return this.enterprise;
    }

    setEnterprise(value) {
        this.enterprise = value;
    }

    getTechnologicalCategories() {
        return this.technologicalCategories;
    }

    setTechnologicalCategories(value) {
        this.technologicalCategories = value;
    }

    getWorkstudy() {
        return this.workstudy;
    }

    setWorkstudy(value) {
        this.workstudy = value;
    }

    getLinks() {
        return this.links;
    }

    setLinks(value) {
        this.links = value;
    }
}

export default Experience;