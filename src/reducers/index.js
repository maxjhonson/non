import { combineReducers } from "redux";
import questionnaireReducer from "./questionnaireReducer";

export default combineReducers({ questionaire: questionnaireReducer });
