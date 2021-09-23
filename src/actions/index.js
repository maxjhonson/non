import coreApi from "../api/coreApi";
import {
  ADD_RULE,
  DELETE_RULE,
  FETCH_QUESTIONNAIRE,
  FETCH_RULES,
} from "./types";

export const fetchQuestionnaire = (id) => {
  return async (dispatch) => {
    const response = await coreApi.get(`/questionnaire/${id}`);
    dispatch({ type: FETCH_QUESTIONNAIRE, payload: response.data });
  };
};

export const fetchRules = (formId) => {
  return async (dispatch) => {
    const response = await coreApi.get(`/rule?formId=${formId}`);
    dispatch({ type: FETCH_RULES, payload: response.data });
  };
};

export const addRule = (rule) => {
  return async (dispatch) => {
    dispatch({ type: ADD_RULE, payload: rule });
    await coreApi.post("/rule", rule);
  };
};

export const deleteRule = (id, formId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RULE, payload: id });
    await coreApi.delete(`/rule/${id}`);
  };
};
