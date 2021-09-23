import { combineReducers } from "redux";
import questionnaireReducer from "./questionnaireReducer";
import rulesReducer from "./rulesReducer";

export default combineReducers({
  questionnaire: questionnaireReducer,
  rules: rulesReducer,
});
