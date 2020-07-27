import DateBarAnimation from "./DateBarAnimation";

class DateBareStep {

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.active = false;
        this.animation = new DateBarAnimation();
    }

    onClick(e) {
        e.preventDefault();
    }
}

export default DateBareStep;