import React from "react";
import {Curtains, Plane} from "curtainsjs";
import FileToString from "./FileToString";
import vertexShader from "./glsl/vertexShader.glsl";
import fragmentShaderCircle from "./glsl/fragmentShaderCircle.glsl";
import fragmentShaderSquare from "./glsl/fragmentShaderSquare.glsl";
import {AiOutlineLogout} from "react-icons/all";

export const SLIDEGL_EFFECT_CIRCLE = "SLIDEGL_EFFECT_CIRCLE";
export const SLIDEGL_EFFECT_SQUARE = "SLIDEGL_EFFECT_SQUARE";

/**
 * @property {Curtains} curtains
 * @property {Texture|null} activeTexture
 * @property {Texture|null} nextTexture
 */
class SlideGL {

    element;
    curtains;
    plane;
    prevent;
    next;

    currentIndex = 0;
    startTime = 0;
    speed = 1000;
    isChanging = false;
    direction = 1;

    activeTexture;
    nextTexture;

    callback;

    /**
     * @param {HTMLElement} slide
     * @param {HTMLElement} canvas
     * @param {HTMLElement} prevent
     * @param {HTMLElement} next
     * @param {string} effect
     * @param  callback
     */
    constructor(slide, canvas, prevent, next, effect, callback) {
        this.element = slide;
        this.prevent = prevent;
        this.next = next;
        this.callback = callback;
        this.initCurtains(canvas).then(()=>{
            this.initPlane(effect).then(() => {
                this.curtains.disableDrawing();
                this.initResolution(slide);
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error)=>{
            console.error(error);
        });
        this.initButtons();
    }

    initCurtains = (canvas) => {
        return new Promise((resolve, reject)=>{
            try{
                const curtainsParams = {
                    container: canvas,
                    pixelRatio: Math.min(2, window.devicePixelRatio),
                };

                this.curtains = new Curtains(curtainsParams);

                resolve();
            }catch (error){
                reject(error);
            }
        });
    }

    initPlane = (effect) => {
        return new Promise((resolve, reject) => {
            let fragmentShader = this.getEffect(effect);
            FileToString.convert(vertexShader).then((vertex) => {
                FileToString.convert(fragmentShader).then((fragment) => {

                    const planeParams = {
                        vertexShader: vertex,
                        fragmentShader: fragment,
                        uniforms: {
                            uProgress: {
                                name: "uProgress",
                                type: "1f",
                                value: 0,
                            },
                            uResolution: {
                                name: "uResolution",
                                type: "2f",
                                value: [this.element.clientWidth, this.element.clientHeight],
                            },
                            uDirection: {
                                name: "uDirection",
                                type: "1f",
                                value: 1,
                            }
                        },
                    };
                    this.plane = new Plane(this.curtains, this.element, planeParams);

                    this.plane.onRender(this.render.bind(this));

                    this.plane.onReady(() => {

                        this.activeTexture = this.plane.createTexture({
                            sampler: 'uActiveTexture',
                            fromTexture: this.plane.textures[0]
                        });

                        this.nextTexture = this.plane.createTexture({
                            sampler: 'uNextTexture',
                            fromTexture: this.plane.textures[0]
                        });

                    });

                    resolve();

                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getEffect(effect) {
        let fragmentShader;
        switch (effect) {
            case SLIDEGL_EFFECT_SQUARE:
                fragmentShader = fragmentShaderSquare;
                break;
            case SLIDEGL_EFFECT_CIRCLE:
                fragmentShader = fragmentShaderCircle;
                break;
            default:
                fragmentShader = fragmentShaderSquare;
                break;
        }
        return fragmentShader;
    }

    initResolution(element) {
        window.addEventListener('resize', () => {
            this.plane.uniforms.uResolution.value = [element.clientWidth, element.clientHeight];
        });
    }

    initButtons() {
        this.prevent.addEventListener('click', () => {
            this.move(-1);
        });
        this.next.addEventListener('click', () => {
            this.move(1);
        });
        // const nextButton = this.createButton("", () => {
        //     this.move(1);
        // });
        // const preventButton = this.createButton("", () => {
        //     this.move(-1);
        //     if(this.callback){
        //         this.callback(-1);
        //     }
        // });
        // this.element.appendChild(preventButton);
        // this.element.appendChild(nextButton);
    }

    // createButton(text, onClick) {
    //     const button = document.createElement("button");
    //     button.addEventListener('click', onClick);
    //     // button.innerText = text;
    //     button.innerHTML = <AiOutlineLogout/>;
    //     button.classList.add("btn-slide");
    //     return button;
    // }

    constraint(valeur, limit) {
        let result = valeur;

        if (valeur > limit) {
            result = 0;
        } else if (valeur < 0) {
            result = limit;
        }

        return result;
    }

    /**
     * @param {number} direction
     */
    move(direction) {
        if (!this.isChanging) {
            const nextCurentIndex = (this.currentIndex + direction);
            const limit = this.plane.images.length - 1;
            const nextIndex = this.constraint(nextCurentIndex, limit);
            this.nextTexture.setSource(this.plane.images[nextIndex]);

            this.isChanging = true;
            this.startTime = Date.now();
            this.direction = direction;
            this.plane.uniforms.uDirection.value = direction;
            this.curtains.enableDrawing();
            if (this.callback) {
                this.callback(direction);
            }
        }
    }

    render() {
        // console.log("render");
        if (this.startTime !== 0) {
            const progress = (Date.now() - this.startTime) / this.speed;
            this.plane.uniforms.uProgress.value = progress;
            if (progress > 1) {

                const newCurentIndex = (this.currentIndex + this.direction);
                const limit = this.plane.images.length - 1;
                this.currentIndex = this.constraint(newCurentIndex, limit);

                this.activeTexture.setSource(this.plane.images[this.currentIndex]);

                this.startTime = 0;
                this.plane.uniforms.uProgress.value = 0;
                this.curtains.disableDrawing();
                this.isChanging = false;
            }
        }
    }
}

export default SlideGL;
