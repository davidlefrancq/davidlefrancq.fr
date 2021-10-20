class TrainingCenter {

    constructor(name, logo, address, postalCode, city, url, lat, lng) {
        this.name = name;
        this.logo = logo;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.url = url;
        this.lat = lat;
        this.lng = lng;
    }

    compare(trainingCenter){
        let result = true;

        if(this.name !== trainingCenter.name){
            result = false;
        }

        if(this.logo !== trainingCenter.logo){
            result = false;
        }

        if(this.address !== trainingCenter.address){
            result = false;
        }

        if(this.postalCode !== trainingCenter.postalCode){
            result = false;
        }

        if(this.city !== trainingCenter.city){
            result = false;
        }

        if(this.url !== trainingCenter.url){
            result = false;
        }

        if(this.lat !== trainingCenter.lat){
            result = false;
        }

        if(this.lng !== trainingCenter.lng){
            result = false;
        }

        return result;
    }
}

export default TrainingCenter;