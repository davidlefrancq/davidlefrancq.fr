class Job {
    constructor(name) {
        this.name = name;
    }

    compare(job){
        let result = true;

        if(this.name != job.name){
            result = false;
        }

        return result;
    }

    compares(jobs){
        let result = true;

        if(jobs != undefined && jobs != null && jobs.length > 0){

            for(const job in jobs){
                if(!this.compare(job)){
                    result = false;
                }
            }

        }else{
            result = false
        }

        return result;
    }
}

export default Job;