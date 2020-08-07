class Link {
    constructor(name,url) {

        this.name = name;
        this.url = url;
    }

    compare(link){
        let result = true;

        if(this.name != link.name){
            result = false;
        }

        if(this.url != link.url){
            result = false;
        }

        return result;
    }

    compares(links){
        let result = true;

        if(links != undefined && links != null && links.length > 0){

            for(const link in links){
                if(!this.compare(link)){
                    result = false;
                }
            }

        }else{
            result = false
        }

        return result;
    }
}

export default Link;