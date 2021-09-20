import coreApi from "../api/coreApi";
import { FETCH_QUESTIONNAIRE } from "./types";

export const fetchQuestionnaire = (id) => {
  return async (dispatch) => {
    const response = await coreApi.get(`/questionnaire/${id}`);
    dispatch({ type: FETCH_QUESTIONNAIRE, payload: response.data });
  };
};
