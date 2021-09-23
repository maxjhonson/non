import { FETCH_QUESTIONNAIRE } from "../actions/types";

const questionnaireReducer = (state=null, action) => {
  switch (action.type) {
    case FETCH_QUESTIONNAIRE:
      return action.payload;
    default:
      return state;
  }
};

export default questionnaireReducer;
