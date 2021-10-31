import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import questionnaireReducer from "./questionnaireReducer";
import rulesReducer from "./rulesReducer";

export default combineReducers({
  questionnaires: questionnaireReducer,
  rules: rulesReducer,
  loading: loadingReducer,
});
