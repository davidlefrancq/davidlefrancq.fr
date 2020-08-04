import React, {Component, createRef} from 'react';
import Globe from "react-globe.gl";
import EarthTexture from "./earth-texture.jpg";
import "./earth.css";

class Earth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            globeEl: createRef(),
            countries: {features: []},
            altitude: 0.1,
            transitionDuration: 1000,
            // data: [
            //     // Paris
            //     {
            //         lat: 48.8566969,
            //         lng: 2.3514616,
            //         text: "Paris",
            //         population: 500000,
            //         onClick: () => {
            //             console.log("Paris")
            //         }
            //     },
            //     // Saint Malo
            //     {
            //         lat: 48.6454528,
            //         lng: -2.015418,
            //         text: "Saint Malo",
            //         population: 250000,
            //         onClick: () => {
            //             console.log("Saint Malo")
            //         }
            //     },
            // ],
        };
    }

    setCountries = (countries) => {
        const state = {...this.state};
        state.countries = countries;
        this.setState(state);
    }

    setAltitude = (altitude) => {
        const state = {...this.state};
        state.altitude = altitude;
        this.setState(state);
    }

    setTransitionDuration = (transitionDuration) => {
        const state = {...this.state};
        state.transitionDuration = transitionDuration;
        this.setState(state);
    }

    componentDidMount() {
        const coordinates = {lat: 46.6061111, lng: 1.8752777777777778, altitude: 0.2};
        this.state.globeEl.current.pointOfView(coordinates, 10000);
    }

    render() {
        return (
            <div className={"earth"}>
                <Globe
                    ref={this.state.globeEl}
                    globeImageUrl={EarthTexture}
                    width={400}
                    height={400}
                    backgroundColor={"#000000"}
                    labelsData={this.props.items}
                    labelLat={(d) => d.lat}
                    labelLng={(d) => d.lng}
                    labelText={(d) => d.text}
                    labelSize={(d) => Math.sqrt(d.population) * 4e-4}
                    labelColor={() => 'rgba(0, 0, 0, 0.9)'}
                    labelResolution={10}
                    labelAltitude={0.005}
                    labelDotRadius={(d) => Math.sqrt(d.population) * 4e-4}
                    onLabelClick={(d) => d.onClick()}
                />
            </div>
        );
    }
}

export default Earth;