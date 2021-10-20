class Enterprise {
    constructor(name,logo,address,postalCode,city,url,lat,lng) {
        this.name = name;
        this.logo = logo;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.url = url;
        this.lat = lat;
        this.lng = lng;
    }

    compare(enterprise){
        let result = true;

        if(this.name !== enterprise.name){
            result = false;
        }

        return result;
    }
}

export default Enterprise;