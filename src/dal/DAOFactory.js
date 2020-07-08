import OccurenceDAO from "./OccurenceDAO";
import AuthenticationDAO from "./AuthenticationDAO";

class DAOFactory {

    constructor() {
        this.occurenceDAO = null;
        this.authenticationDAO = null;
    }

    getOccurenceDAO(){

        if(this.occurenceDAO == null){
            this.occurenceDAO = new OccurenceDAO();
        }

        return this.occurenceDAO;
    }

    getAuthenticationDAO(){
        if(this.authenticationDAO == null){
            this.authenticationDAO = new AuthenticationDAO();
        }

        return this.authenticationDAO;
    }

}

export default DAOFactory;