class VarUtils{

    static isNotUndefinedNull(e){

        let isNotUndefinedNull = true;

        if(e == undefined){
            isNotUndefinedNull = false;
        }

        if(e == null){
            isNotUndefinedNull = false;
        }

        return isNotUndefinedNull;
    }
}

export default VarUtils;