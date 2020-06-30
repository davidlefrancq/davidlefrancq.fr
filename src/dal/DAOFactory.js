import OccurenceDAO from "./OccurenceDAO";

class DAOFactory {

    constructor() {
        this.occurenceDAO = null;
    }

    getOccurenceDAO(){

        if(this.occurenceDAO == null){
            this.occurenceDAO = new OccurenceDAO();
        }

        return this.occurenceDAO;
    }

}

export default DAOFactory;