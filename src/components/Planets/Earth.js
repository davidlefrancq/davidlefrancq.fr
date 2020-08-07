import React, {Component, createRef} from 'react';
import Globe from "react-globe.gl";
import {scaleOrdinal} from "d3-scale";
import EarthTexture from "./earth-texture.jpg";
import "./earth.css";
import {connect} from "react-redux";
import CityItem from "./bo/CityItem";
import {actions} from "../../actions";
import Accents from "../../utils/Accents";

// const labelsTopOrientation = new Set([
//     "Apollo 12",
//     "Luna 2",
//     "Luna 20",
//     "Luna 21",
//     "Luna 24",
//     "LCROSS Probe"
// ]);
//
// const colorScale = scaleOrdinal([
//     "orangered",
//     "mediumblue",
//     "darkgreen",
//     "yellow"
// ]);

class Earth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            globeEl: createRef(),
        };
    }

    componentDidMount() {
        const coordinates = {lat: 46.6061111, lng: 1.8752777777777778, altitude: 0.2};
        this.gotoPosition(coordinates, 5000);
    }

    gotoPosition({lat, lng, altitude}, duration) {

        if (!duration) {
            duration = 800;
        }

        this.state.globeEl.current.pointOfView({lat, lng, altitude}, duration);
    }

    getEarthItems = () => {
        return this.generateEarthItems();
    }

    getLat = (occurrence) => {
        let lat = null;

        if (occurrence.experience != null) {
            if (occurrence.experience.enterprise.lat != "") {
                lat = occurrence.experience.enterprise.lat;
            }
        }

        if (occurrence.qualification != null) {
            if (occurrence.qualification.trainingCenter.lat != "") {
                lat = occurrence.qualification.trainingCenter.lat;
            }
        }

        return lat;
    }

    getLng = (occurrence) => {
        let lng = null;

        if (occurrence.experience != null) {
            if (occurrence.experience.enterprise.lng != "") {
                lng = occurrence.experience.enterprise.lng;
            }
        }

        if (occurrence.qualification != null) {
            if (occurrence.qualification.trainingCenter.lng != "") {
                lng = occurrence.qualification.trainingCenter.lng;
            }
        }

        return lng;
    }

    getCityName = (occurrence) => {
        let city = null;

        if (occurrence.experience != null) {
            if (occurrence.experience.enterprise.city != "") {
                city = occurrence.experience.enterprise.city;
            }
        }

        if (occurrence.qualification != null) {
            if (occurrence.qualification.trainingCenter.city != "") {
                city = occurrence.qualification.trainingCenter.city;
            }
        }

        city = Accents.removeAccents(city);

        return city;
    }

    getPopulation(city) {
        const cityString = '' + city;
        switch (cityString.toLowerCase()) {
            case "paris":
                return 1000000;
            case "brest":
                return 500000;
            case "veynes":
                return 100000;
            case "laragne-monteglin":
                return 50000;
            default:
                return 180000;
        }
    }

    getAltitude(city){
        const cityString = '' + city;
        switch (cityString.toLowerCase()) {
            case "paris":
                return 0.14;
            case "brest":
                return 0.12;
            case "veynes":
                return 0.06;
            case "laragne-monteglin":
                return 0.04;
            default:
                return 0.1;
        }
    }

    generateEarthItems = () => {
        const {occurrences} = this.props;
        const items = [];

        if (occurrences && occurrences[0] != undefined) {

            const keysOccurences = Object.keys(occurrences);
            keysOccurences.map((key) => {
                const occurrence = occurrences[key];
                const lat = this.getLat(occurrence);
                const lng = this.getLng(occurrence);
                const cityName = this.getCityName(occurrence);
                const comment = this.getComment(occurrence);
                const population = this.getPopulation(cityName);
                const altitude = this.getAltitude(cityName);
                let orientation = "top";
                if(cityName == "Manosque" || cityName == "Laragne-Monteglin"){
                    orientation = "bottom";
                }
                const city = new CityItem(lat, lng, cityName, comment, population, orientation, altitude);
                city.onClick = () => {
                    this.updateTarget(key);
                };

                items.push(city);
            });
        }

        return items;
    }

    getComment(occurrence){
        const {experience, qualification} = occurrence;
        let result = ``;

        if(experience != null){
            result = `<div style="background-color: rgba(255,255,255,0.9); color: #000000; padding:5px; border-radius: 10px;">
                ${experience.enterprise.name}
            </div>`;
        }
        if(qualification != null){
            result = `<div style="background-color: rgba(255,255,255,0.9); color: #000000; padding:5px; border-radius: 10px;">
                ${qualification.trainingCenter.name}
            </div>`;
        }

        return result;
    }

    updateTarget = (target) => {
        this.props.updateOccurenceSelected(target);
    }

    renderGlobe() {
        return (
            <Globe
                ref={this.state.globeEl}
                width={400}
                height={400}
                globeImageUrl={EarthTexture}
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                backgroundColor={"#000000"}
                animateIn={false}
                showAtmosphere={true}
                showGraticules={false}
                labelsData={this.getEarthItems()}
                labelLat={(d) => d.lat}
                labelLng={(d) => d.lng}
                labelText="text"
                labelSize={(d) => Math.sqrt(d.population) * 4e-4}
                labelDotRadius={(d) => Math.sqrt(d.population) * 4e-4}
                labelColor={() => 'rgba(0, 0, 0, 0.8)'}
                labelDotOrientation={(d) => d ? d.orientation : "top"}
                labelLabel={d => `
                  <div>${d.comment}</div>
                `}
                onLabelClick={d => {
                    this.gotoPosition(d);
                    d.onClick();
                }}
            />
        );
    }

    render() {
        return (
            <div className={"earth"}>

                {this.renderGlobe()}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {occurrences} = state.OccurrencesReducer;
    return {
        occurrences,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Earth);