import {
  ADD_RULE,
  DELETE_RULE,
  FETCH_RULES,
  UPDATE_RULE,
} from "../actions/types";

const rulesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RULES:
      return action.payload;
    case DELETE_RULE:
      return state.filter((rule) => rule._id !== action.payload);
    case ADD_RULE:
      return [...state, { ...action.payload }];
    case UPDATE_RULE:
      const rulesUpdated = state.map((rule) =>
        rule._id !== action.payload._id ? rule : action.payload
      );
      return rulesUpdated;
    default:
      return state;
  }
};

export default rulesReducer;
