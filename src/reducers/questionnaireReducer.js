import {
  ADD_QUESTIONNAIRE,
  ADD_QUESTIONNAIRE_ERROR,
  ADD_QUESTIONNAIRE_SUCCESS,
  FETCH_ALL_QUESTIONNAIRE,
  FETCH_ALL_QUESTIONNAIRE_SUCCESS,
  FETCH_DEPENDENT_FORM,
  FETCH_DEPENDENT_FORM_SUCCESS,
  FETCH_QUESTIONNAIRE,
  FETCH_ROOT_FORM,
  FETCH_ROOT_FORM_SUCCESS,
  RESET_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE_SUCCESS,
} from "../actions/types";

const initialState = {
  all: [],
  current: null,
  error: null,
  loading: false,
  rootForm: null,
  dependent: null,
};

const questionnaireReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_QUESTIONNAIRE:
      return { ...state, loading: true, error: null };
    case UPDATE_QUESTIONNAIRE_SUCCESS:
      return { ...state, loading: false, current: action.payload, error: null };
    case ADD_QUESTIONNAIRE:
      return { ...state, loading: true, error: null };
    case ADD_QUESTIONNAIRE_SUCCESS:
      return { ...state, loading: false, current: action.payload, error: null };
    case ADD_QUESTIONNAIRE_ERROR:
      return { ...state, loading: false, error: "Error" };
    case FETCH_QUESTIONNAIRE:
      return { ...state, current: action.payload };
    case FETCH_ALL_QUESTIONNAIRE:
      return { ...state, loading: true };
    case FETCH_ALL_QUESTIONNAIRE_SUCCESS:
      return { ...state, all: action.payload, loading: false };
    case RESET_QUESTIONNAIRE:
      return { ...state, current: undefined };
    case FETCH_ROOT_FORM:
      return { ...state, loading: true, error: null };
    case FETCH_ROOT_FORM_SUCCESS:
      return { ...state, loading: false, error: null, rootForm: action.payload };
    case FETCH_DEPENDENT_FORM:
      return { ...state, loading: true, error: null };
    case FETCH_DEPENDENT_FORM_SUCCESS:
      return { ...state, loading: false, error: null, dependent: action.payload };
    default:
      return state;
  }
};

export default questionnaireReducer;
