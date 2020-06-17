class Enterprise {
    constructor(name,logo,address,postalCode,city,url) {
        this.name = name;
        this.logo = logo;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.url = url;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getLogo() {
        return this.logo;
    }

    setLogo(value) {
        this.logo = value;
    }

    getAddress() {
        return this.address;
    }

    setAddress(value) {
        this.address = value;
    }

    getPostalCode() {
        return this.postalCode;
    }

    setPostalCode(value) {
        this.postalCode = value;
    }

    getCity() {
        return this.city;
    }

    setCity(value) {
        this.city = value;
    }

    getUrl() {
        return this.url;
    }

    setUrl(value) {
        this.url = value;
    }
}

export default Enterprise;