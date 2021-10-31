import { UPDATE_LOADING } from "../actions/types";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default loadingReducer;
