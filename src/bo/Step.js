class Step {

    constructor(title, description, dateStart, dateEnd) {
        this.title = title;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.description = description;
        this.image = "https://picsum.photos/1200/300";
    }

    onClick(e) {
        e.preventDefault();
    }
}

export default Step;