class Step {

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.active = false;
    }

    action(e) {
        console.log(e.target.id)
    }
}

export default Step;