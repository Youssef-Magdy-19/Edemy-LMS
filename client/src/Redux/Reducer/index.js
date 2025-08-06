import { combineReducers } from "redux";
import reducerLec from "./reducerLecture";

const rootReducer = combineReducers({
    ReducerLecture : reducerLec
})
export default rootReducer