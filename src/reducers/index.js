import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import questionnaireReducer from "./questionnaireReducer";
import recomendationReducer from "./recomendationReducer";
import rulesReducer from "./rulesReducer";

export default combineReducers({
  questionnaires: questionnaireReducer,
  rules: rulesReducer,
  loading: loadingReducer,
  recomendations: recomendationReducer,
});
