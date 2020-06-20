import {combineReducers} from 'redux';
import AuthentificationReducer from "./AuthentificationReducer";
import OccurencesReducer from "./OccurencesReducer";
import QualificationReducer from "./QualificationReducer";
import ExperienceReducer from "./ExperienceReducer";

const rootReducer = combineReducers({
    AuthentificationReducer,
    OccurencesReducer,
    QualificationReducer,
    ExperienceReducer,
});

export default rootReducer;