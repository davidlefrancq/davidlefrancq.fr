class TechnologicalCategorie {
    constructor(name, logo) {
        this.name = name;
        this.logo = logo;
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
}

export default TechnologicalCategorie;