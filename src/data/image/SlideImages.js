import informatique01 from "./informatique-01.jpg";
import informatique02 from "./informatique-02.jpg";
import informatique03 from "./informatique-03.jpg";
import informatique04 from "./informatique-04.jpg";
import informatique05 from "./informatique-05.jpg";
import informatique06 from "./informatique-06.jpg";
import informatique07 from "./informatique-07.jpg";
import informatique08 from "./informatique-08.jpg";
import informatique09 from "./informatique-09.jpg";
import informatique10 from "./informatique-10.jpg";
import informatique11 from "./informatique-11.jpg";
import informatique12 from "./informatique-12.png";
import informatique13 from "./informatique-13.jpg";
import informatique14 from "./informatique-14.jpeg";
import informatique15 from "./informatique-15.jpg";
import informatique16 from "./informatique-16.jpeg";
import navy03 from "./navy-03.png";
import navysecretdefense from "./navy-secret-defense.jpg";
import secours from "./1ers-secours.jpg";
import elearning from "./elearning.jpg";
import elearning1 from "./elearning1.jpg";
import elearning2 from "./elearning2.jpg";
import elearning3 from "./elearning3.jpg";
import elearning4 from "./elearning4.jpg";

class SlideImages{

    images;

    constructor() {
        this.images = [];
        this.initImages();
    }

    initImages(){
        let i = 0;
        this.images[i] = informatique04;
        i++;
        this.images[i] = informatique09;
        i++;
        this.images[i] = secours;
        i++;
        this.images[i] = navy03;
        i++;
        this.images[i] = informatique03;
        i++;
        this.images[i] = navysecretdefense;
        i++;
        this.images[i] = informatique11;
        i++;
        this.images[i] = informatique05;
        i++;
        this.images[i] = informatique06;
        i++;
        this.images[i] = informatique13;
        i++;
        this.images[i] = informatique14;
        i++;
        this.images[i] = elearning;
        i++;
        this.images[i] = elearning1;
        i++;
        this.images[i] = elearning2;
        i++;
        this.images[i] = informatique01;
        i++;
        this.images[i] = informatique16;
        i++;
        this.images[i] = elearning3;
        i++;
        this.images[i] = elearning4;
        i++;
        this.images[i] = informatique08;
        i++;

        // this.images[i] = informatique02;
        // this.images[i] = informatique03;
        // this.images[i] = informatique04;
        // this.images[i] = informatique07;
        // this.images[i] = informatique10;
        // this.images[i] = informatique12;
    }

}

export default SlideImages;
