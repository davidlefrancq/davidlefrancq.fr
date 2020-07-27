class DateBarAnimation {
    constructor() {

        this.start = false;
        this.end = false;
        this.css = {
            li:"active",
            title:"datebar-title-active",
        };
        this.duration = 100;

        this.enter={
            css:"datebar-title-enter",
            active:false,
        };

        this.leave={
            css:"datebar-title-leave",
            active:false,
        };
    }
}

export default DateBarAnimation;