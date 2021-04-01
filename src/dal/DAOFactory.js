import OccurrenceDAO from "./OccurrenceDAO";
import AuthenticationDAO from "./AuthenticationDAO";

class DAOFactory {

    constructor() {
        this.occurcenceDAO = null;
        this.authenticationDAO = null;
    }

    getOccurrenceDAO(){

        if(this.occurrenceDAO == null){
            this.occurrenceDAO = new OccurrenceDAO();
        }

        return this.occurrenceDAO;
    }

    getAuthenticationDAO(){
        if(this.authenticationDAO == null){
            this.authenticationDAO = new AuthenticationDAO();
        }

        return this.authenticationDAO;
    }

}

export default DAOFactory;