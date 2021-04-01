class FirstCharUppercase {
    static convert(string){
        if(string != undefined && string != null){
            if(string[0] != undefined){
                return string[0].toUpperCase() + string.slice(1);
            }
        }
    }
}

export default FirstCharUppercase;