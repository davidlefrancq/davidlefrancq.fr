import React, {Component, Fragment} from 'react';
import {Carousel} from "react-bootstrap";
import {connect} from "react-redux";
import {actions} from "../actions";

const maxHeight = "250px";

// Voir d'abord le problème des targets lors du changement de date
// Sinon Carousel à refaire
// peut être avec ....
// https://www.npmjs.com/package/react-responsive-carousel

class CvCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // index: 0,
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedIndex, e) {

        const {occurences} = this.props;
        const occurence = occurences[selectedIndex];

        if(occurence.experience instanceof Object){
            this.props.setExperienceSelected(selectedIndex);
        }

        if(occurence.qualification instanceof Object){
            this.props.setQualificationSelected(selectedIndex);
        }
    }

    renderCarousel(occurences) {
        if (occurences != undefined && occurences != null && occurences[0] != undefined) {
            let index = 0;

            if(occurences[0].experience instanceof Object){
                index = this.props.experienceSelected;
            }

            if(occurences[0].qualification instanceof Object){
                index = this.props.qualificationSeleted;
            }

            return (
                <Carousel
                    activeIndex={index}
                    onSelect={this.handleSelect}
                    interval={null}
                    style={{
                        maxHeight: maxHeight,
                    }}
                >
                    {this.renderCarouselItems(occurences)}
                </Carousel>
            );
        }
    }

    renderImg(occurence) {

        let urlImg = "https://wallpapercave.com/wp/wp3137838.jpg";
        const {experience, qualification} = occurence;
        if (experience != undefined && experience != null) {
            let {img} = experience;
            if (img != undefined && img != null) {
                urlImg = img;
            }
        }
        if (qualification != undefined && qualification != null) {
            let {img} = qualification;
            if (img != undefined && img != null) {
                urlImg = img;
            }
        }

        return (
            <img
                className={"img-fluid"}
                src={urlImg}
                alt={this.renderOccurenceTitle(occurence)}
            />
        );
    }

    renderDateStar(occurence) {
        const {experience, dateStart} = occurence;
        if (experience != undefined && experience != null) {
            if (dateStart != undefined && dateStart != null) {
                let date = new Date(dateStart);
                return <span className="badge badge-secondary m-1" style={{fontSize: "medium"}}>{date.getFullYear()}</span>;
            }
        }
    }

    renderCarouselItems(occurences) {
        const occurencesIds = Object.keys(occurences);
        return (
            occurencesIds.map((key) => {
                    const occurence = occurences[key];
                    return (
                        <Carousel.Item
                            key={key}
                            style={{
                                maxHeight: maxHeight,
                            }}
                        >
                            <button
                                style={{
                                    position: "absolute",
                                    top: "10%",
                                    left: "20%",
                                    border: "1px dotted #ffffff",
                                    backgroundColor: "rgba(255,255,255,0)",
                                    width: "60%",
                                    height: "40%",
                                    color: "#ffffff"
                                }}
                                onClick={(e) => {
                                    this.props.handleOccurence(occurence);
                                }}
                            >
                                info
                            </button>

                            {this.renderImg(occurence)}

                            <Carousel.Caption
                                style={{
                                    backgroundColor: "rgba(0,0,0,0.95)",
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                }}
                                className={"pt-0 pl-0 pr-0 pb-0"}
                            >
                                <button
                                    className={"col-12 text-white p-0"}
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0)",
                                        borderTop: "0",
                                        borderBottom: "0",
                                        borderLeft: "0",
                                        borderRight: "0",
                                    }}
                                    onClick={(e) => {
                                        this.props.handleOccurence(occurence);
                                    }}>
                                    <h3 style={{fontSize:"x-large"}}>{this.renderOccurenceTitle(occurence)}</h3>
                                </button>
                                <p className={"mb-4"}>
                                    {this.getQualificationInfo(occurence)}

                                    {this.renderDateStar(occurence)}

                                    <span className="badge badge-secondary m-1" style={{fontSize: "medium"}}>
                                    {occurence.dateEnd.getFullYear()}
                                    </span>
                                </p>
                            </Carousel.Caption>

                        </Carousel.Item>
                    );
                }
            )
        );
    }

    getQualificationInfo(occurence) {
        const {qualification} = occurence;
        if (qualification != undefined && qualification != null) {
            const {level} = qualification;
            if (level != undefined && level != null) {
                return <span className="badge badge-secondary m-1" style={{fontSize: "medium"}}>{level}</span>;
            }
        }
    }

    renderOccurenceTitle(occurence) {

        const {qualification, experience} = occurence;
        let title = "";

        if (qualification != undefined && qualification != null) {
            title = qualification.title;
        }

        if (experience != undefined && experience != null) {
            title = experience.jobTitle;
        }

        return (
            <Fragment>
                {title}
            </Fragment>
        );
    }

    render() {

        const {occurences} = this.props;
        return (
            <Fragment>
                {this.renderCarousel(occurences)}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const qualificationSeleted = state.QualificationReducer.selected;
    const experienceSelected = state.ExperienceReducer.selected;
    return {
        qualificationSeleted,
        experienceSelected,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        setExperienceSelected: (id) => dispatch(actions.experience.setExperienceSelected(id)),
        setQualificationSelected: (id) => dispatch(actions.qualification.setQualificationSelected(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CvCarousel);