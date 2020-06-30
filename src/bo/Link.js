class Link {
    constructor(name,url) {

        this.name = name;
        this.url = url;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getUrl() {
        return this.url;
    }

    setUrl(value) {
        this.url = value;
    }
}

export default Link;