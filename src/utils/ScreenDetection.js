class ScreenDetection {

    static getResolition(){
        const result = {
            x : eval(window.innerWidth),
            y : eval(window.innerHeight),
        }
        return result;
    }

    static getBootstrapSize(){

        let result = "col";
        const resolution = ScreenDetection.getResolition();
        const width = resolution.x;

        if(width >= 576){
            result = "col-sm";
        }

        if(width >= 768){
            result = "col-md";
        }

        if(width >= 992){
            result = "col-lg";
        }

        if(width >= 1200){
            result = "col-xl";
        }

        return result;
    }
}

export default ScreenDetection;