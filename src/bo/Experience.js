class Experience {

    constructor(name, comment, img, enterprise, technologicalCategories, workstudy, links) {

        this.name = name;
        this.comment = comment;
        this.img = img;
        this.enterprise = enterprise;
        this.technologicalCategories = technologicalCategories;
        this.workstudy = workstudy;
        this.links = links;
    }

    compare(experience){
        let result = true;

        if(this.name !== experience.name){
            result = false;
        }

        if(this.enterprise != null){
            if(!this.enterprise.compare(experience.enterprise)){
                result = false;
            }
        }

        if(this.technologicalCategories != null){
            if(!this.compareTechnologicalCategories(experience.technologicalCategories)){
                result = false;
            }
        }

        if(this.workstudy !== experience.workstudy){
            result = false;
        }

        if(this.links != null){
            if(!this.compareLinks(experience.links)){
                result = false;
            }
        }

        return result;
    }

    compareTechnologicalCategories(technologicalCategories){
        let result = true;
        if(this.technologicalCategories !== undefined && this.technologicalCategories != null){

            if(technologicalCategories === undefined || technologicalCategories === null){
                result = false;
            }else{

                if(technologicalCategories.length === 0){
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

    compareLinks(links){
        let result = true;
        if(this.links !== undefined && this.links !== null){

            if(links === undefined || links === null){
                result = false;
            }else{

                if(links.length === 0){
                    result = false;
                }else{

                    if(this.links.length > 0){
                        for(const link in this.links){
                            if(link != null){
                                if(!link.compares(links)){
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

export default Experience;