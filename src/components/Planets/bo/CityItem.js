class CityItem {

    constructor(lat, lng, text, population) {
        this.lat = lat;
        this.lng = lng;
        this.text = text;
        this.population = population;
        this.onClick = (e) => e.preventDefault();
    }

}

export default CityItem;