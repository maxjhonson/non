import coreApi from "../api/coreApi";
import {
  ADD_RULE,
  DELETE_RULE,
  FETCH_ALL_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRE,
  FETCH_RULES,
  RESET_QUESTIONNAIRE,
  UPDATE_LOADING,
  UPDATE_QUESTIONNAIRE,
} from "./types";

export const fetchQuestionnaire = (id) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    const response = await coreApi.get(`/questionnaire/${id}`);
    dispatch({ type: FETCH_QUESTIONNAIRE, payload: response.data });
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const saveOrUpdate = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    if (formValues._id) {
      const response = await coreApi.put(`/questionnaire/`, {
        data: JSON.stringify(formValues),
      });
      console.log(response.data);
      dispatch({ type: UPDATE_QUESTIONNAIRE, payload: response.data });
    } else {
      const response = await coreApi.put(`/questionnaire`, {
        data: JSON.stringify(formValues),
      });
      dispatch({ type: UPDATE_QUESTIONNAIRE, payload: response.data });
    }
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const resetQuestionnaire = () => {
  return (dispatch) => {
    dispatch({ type: RESET_QUESTIONNAIRE, payload: undefined });
  };
};

export const fetchAllQuestionnaires = () => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    const response = await coreApi.get(`/questionnaire/`);
    dispatch({ type: FETCH_ALL_QUESTIONNAIRE, payload: response.data });
    dispatch({ type: UPDATE_LOADING, payload: false });
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
    dispatch({ type: UPDATE_LOADING, payload: true });
    dispatch({ type: ADD_RULE, payload: rule });
    await coreApi.post("/rule", rule);
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const deleteRule = (id, formId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RULE, payload: id });
    await coreApi.delete(`/rule/${id}`);
  };
};

export const updateQuestionnaire = (id, formValues) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    await coreApi.put((`/questionnaire/${id}`, formValues));
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const addQuestionnaire = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    await coreApi.post(`/questionnaire/`, formValues);
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};
