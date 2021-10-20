import OccurrenceDAO from "./OccurrenceDAO";

class DAOFactory {

    constructor() {
        this.occurcenceDAO = null;
    }

    getOccurrenceDAO(){

        if(this.occurrenceDAO == null){
            this.occurrenceDAO = new OccurrenceDAO();
        }

        return this.occurrenceDAO;
    }
}

export default DAOFactory;