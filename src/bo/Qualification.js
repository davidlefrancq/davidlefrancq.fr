class Qualification {

    constructor(name, img, level, trainingCenter, objectives, jobs, links, technologicalCategories) {
        this.name = name;
        this.img = img;
        this.level = level;
        this.trainingCenter = trainingCenter;
        this.objectives = objectives;
        this.jobs = jobs;
        this.links = links;
        this.technologicalCategories = technologicalCategories;
    }

    compare(qualification) {
        let result = true;

        if (this.name != qualification.name) {
            result = false;
        }

        if (this.img != qualification.img) {
            result = false;
        }

        if (this.level != qualification.level) {
            result = false;
        }

        if (this.trainingCenter != null) {
            if (!this.trainingCenter.compare(qualification.trainingCenter)) {
                result = false;
            }
        }

        if (this.objectives != qualification.objectives) {
            result = false;
        }

        if (this.jobs != null) {
            if (!this.compareJobs(qualification.jobs)) {
                result = false;
            }
        }

        if (this.links != null) {
            if (!this.compareLinks(qualification.links)) {
                result = false;
            }
        }

        if(this.technologicalCategories != null){
            if(!this.compareTechnologicalCategories(qualification.technologicalCategories)){
                result = false;
            }
        }

        return result;
    }

    compareJobs(jobs) {
        let result = true;
        if (this.jobs != undefined && this.jobs != null) {

            if (jobs == undefined || jobs == null) {
                result = false;
            } else {

                if (jobs.length == 0) {
                    result = false;
                } else {

                    if (this.jobs.length > 0) {
                        for (const job in this.jobs) {
                            if (job != null) {
                                if (!job.compares(jobs)) {
                                    result = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }

    compareLinks(links) {
        let result = true;
        if (this.links != undefined && this.links != null) {

            if (links == undefined || links == null) {
                result = false;
            } else {

                if (links.length == 0) {
                    result = false;
                } else {

                    if (this.links.length > 0) {
                        for (const link in this.links) {
                            if (link != null) {
                                if (!link.compares(links)) {
                                    result = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }

    compareTechnologicalCategories(technologicalCategories){
        let result = true;
        if(this.technologicalCategories != undefined && this.technologicalCategories != null){

            if(technologicalCategories == undefined || technologicalCategories == null){
                result = false;
            }else{

                if(technologicalCategories.length == 0){
                    result = false;
                }else{

                    if(this.technologicalCategories.length > 0){
                        for(const technologicalCategory in this.technologicalCategories){
                            if(technologicalCategory != null){
                                if(!technologicalCategory.compares(technologicalCategories)){
                                    result = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}

export default Qualification;
