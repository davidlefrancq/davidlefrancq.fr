class CityItem {

    constructor(lat, lng, text, comment, population, orientation, altitude) {
        this.lat = lat;
        this.lng = lng;
        this.text = text;
        this.comment = comment;
        this.orientation = this.setOrientation(orientation);
        this.population = population;
        this.altitude = altitude;
        this.onClick = () => {
            console.log("onClick City Item");
        };

    }

    setOrientation(orientation){
        let result  = "top";

        if(orientation == "right" || orientation == "bottom"){
            result = orientation;
        }

        return result;
    }

    compare(item){
        let result = true;

        if(this.lat !== item.lat){
            result = false;
        }

        if(this.lng !== item.lng){
            result = false;
        }

        if(this.text !== item.text){
            result = false;
        }

        if(this.comment !== item.comment){
            result = false;
        }

        if(this.orientation !== item.orientation){
            result = false;
        }

        if(this.population !== item.population){
            result = false;
        }

        return result;
    }

    compares(items){
        let result = true;

        for(const item in items){
            if(!this.compare(item)){
                result = false;
            }
        }

        return result;
    }

}

export default CityItem;