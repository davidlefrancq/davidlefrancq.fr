class TechnologicalCategory {

    constructor(name, logo) {
        this.name = name;
        this.logo = logo;
    }

    compare(technologicalCategory){
        let result = true;

        if(this.name !== technologicalCategory.name){
            result = false;
        }

        if(this.logo !== technologicalCategory.logo){
            result = false;
        }

        return result;
    }

    compares(technologicalCategories){
        let result = true;

        if(technologicalCategories !== undefined && technologicalCategories !== null && technologicalCategories.length > 0){

            for(const technologicalCategory in technologicalCategories){
                if(!this.compare(technologicalCategory)){
                    result = false;
                }
            }

        }else{
            result = false
        }

        return result;
    }
}

export default TechnologicalCategory;