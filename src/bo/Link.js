class Link {
    constructor(title,url) {

        this.title = title;
        this.url = url;
    }

    getTitle() {
        return this.title;
    }

    setTitle(value) {
        this.title = value;
    }

    getUrl() {
        return this.url;
    }

    setUrl(value) {
        this.url = value;
    }
}

export default Link;