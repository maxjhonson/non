import {
  ADD_QUESTIONNAIRE,
  FETCH_ALL_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRE,
  RESET_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE,
} from "../actions/types";

const questionnaireReducer = (state = { all: [] }, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_QUESTIONNAIRE || ADD_QUESTIONNAIRE:
      return { ...state, current: action.payload };
    case FETCH_QUESTIONNAIRE:
      return { ...state, current: action.payload };
    case FETCH_ALL_QUESTIONNAIRE:
      return { ...state, all: action.payload };
    case RESET_QUESTIONNAIRE:
      return { ...state, current: undefined };
    default:
      return state;
  }
};

export default questionnaireReducer;
