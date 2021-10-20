import {combineReducers} from 'redux';
import OccurrencesReducer from "./OccurrencesReducer";

const rootReducer = combineReducers({
    OccurrencesReducer,
});

export default rootReducer;