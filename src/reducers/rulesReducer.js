import { ADD_RULE, DELETE_RULE, FETCH_RULES } from "../actions/types";

const rulesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RULES:
      return action.payload;
    case DELETE_RULE:
      return state.filter((rule) => rule._id !== action.payload);
    case ADD_RULE:
      return [...state, { ...action.payload }];
    default:
      return state;
  }
};

export default rulesReducer;
