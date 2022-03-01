import {
  ADD_GRADE_RECOMENDATION,
  ADD_GRADE_RECOMENDATION_ERROR,
  ADD_GRADE_RECOMENDATION_SUCCESS,
  DELETE_GRADE_RECOMENDATION,
  DELETE_GRADE_RECOMENDATION_ERROR,
  DELETE_GRADE_RECOMENDATION_SUCCESS,
  FETCH_ALL_GRADE_RECOMENDATION,
  FETCH_ALL_GRADE_RECOMENDATION_SUCCESS,
  UPDATE_GRADE_RECOMENDATION,
  UPDATE_GRADE_RECOMENDATION_ERROR,
  UPDATE_GRADE_RECOMENDATION_SUCCESS,
} from "../actions/types";

const defaultState = { loading: false, all: [], current: null, hasError: false };

const gradeRecomendationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ALL_GRADE_RECOMENDATION:
      return { ...state, loading: true };
    case FETCH_ALL_GRADE_RECOMENDATION_SUCCESS:
      return { ...state, loading: false, all: action.payload };
    case ADD_GRADE_RECOMENDATION:
      return { ...state, loading: true, hasError: false };
    case ADD_GRADE_RECOMENDATION_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.payload],
        current: action.payload,
        loading: false,
        hasError: false,
      };
    case ADD_GRADE_RECOMENDATION_ERROR:
      return { ...state, hasError: true, loading: false };
    case UPDATE_GRADE_RECOMENDATION:
      return { ...state, loading: true, hasError: false };
    case UPDATE_GRADE_RECOMENDATION_SUCCESS: {
      const { _id } = action.payload;
      const all = state.all.map((x) => (x._id !== _id ? x : action.payload));
      return {
        ...state,
        all: [...all],
        current: action.payload,
        loading: false,
        hasError: false,
      };
    }
    case UPDATE_GRADE_RECOMENDATION_ERROR:
      return { ...state, hasError: true, loading: false };

    case DELETE_GRADE_RECOMENDATION:
      return { ...state, loading: true, hasError: false };
    case DELETE_GRADE_RECOMENDATION_SUCCESS: {
      const _id = action.payload;
      const all = state.all.filter((x) => x._id !== _id);
      return {
        ...state,
        all: [...all],
        current: action.payload,
        loading: false,
        hasError: false,
      };
    }
    case DELETE_GRADE_RECOMENDATION_ERROR:
      return { ...state, hasError: true, loading: false };
    default:
      return state;
  }
};

export default gradeRecomendationReducer;
