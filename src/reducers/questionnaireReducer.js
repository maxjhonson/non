import { FETCH_ALL_QUESTIONNAIRE, FETCH_QUESTIONNAIRE } from "../actions/types";

const questionnaireReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTIONNAIRE:
      return { all: state.all, current: action.payload };
    case FETCH_ALL_QUESTIONNAIRE:
      return { all: action.payload };
    default:
      return state;
  }
};

export default questionnaireReducer;
