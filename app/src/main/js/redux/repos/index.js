import { combineReducers } from 'redux';
import { countReducer } from "./count-repo";

const combinedReducers = combineReducers({
    count: countReducer,
});

export default combinedReducers;
