import {
  ADD_RECOMENDATION,
  FETCH_RECOMENDATIONS,
  UPDATE_RECOMENDATION,
  DELETE_RECOMENDATION,
} from "../actions/types";

const recomendationReducer = (state = { all: [], current: null }, action) => {
  switch (action.type) {
    case ADD_RECOMENDATION || UPDATE_RECOMENDATION:
      return { all: [...state.all, action.payload] };
    case FETCH_RECOMENDATIONS:
      return { all: action.payload };
    case DELETE_RECOMENDATION:
      return { all: state.all.filter((x) => x._id !== action.payload) };
    default:
      return state;
  }
};

export default recomendationReducer;
