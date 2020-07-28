import {combineReducers} from 'redux';
import AuthentificationReducer from "./AuthentificationReducer";
import OccurrencesReducer from "./OccurrencesReducer";
import QualificationReducer from "./QualificationReducer";
import ExperienceReducer from "./ExperienceReducer";

const rootReducer = combineReducers({
    AuthentificationReducer,
    OccurrencesReducer: OccurrencesReducer,
    QualificationReducer,
    ExperienceReducer,
});

export default rootReducer;