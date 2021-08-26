import React, { isValidElement, useEffect, useState } from "react";
import Answer from "./Answer";
import { v4 as uuidv4 } from "uuid";
import { ALFABET } from "../../../common/constants";

const AddDependent = ({ state, setState, selectedQuestion }) => {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});

  const questionOptions = () => {
    return state.questions
      .filter((quest) => quest.index != selectedQuestion.index)
      .map((quest) => {
        return (
          <option
            selected={selectedQuestion.denpentQuestion === quest._id}
            value={quest._id}
          >
            {quest.text}
          </option>
        );
      });
  };

  useEffect(() => {
    onQuestionChange(selectedQuestion.denpentQuestion);
  }, [selectedQuestion]);

  const answerOptions = () => {
    return question?.answers?.map((answ) => {
      return (
        <option
          selected={selectedQuestion.dependentAnswer === answ._id}
          value={answ._id}
        >
          {answ.text}
        </option>
      );
    });
  };

  const onQuestionChange = (id) => {
    const question = state.questions.find((q) => q._id === id);
    setQuestion(question);
  };

  const onAnswerChange = (id) => {
    console.log(id);
    const answer = question?.answers?.find((a) => a._id === id);
    setAnswer(answer);
  };

  const asing = () => {
    const questions = state.questions.map((q) => {
      if (q._id !== selectedQuestion._id) return q;

      return {
        ...q,
        denpentQuestion: question?._id,
        dependentAnswer: answer?._id,
      };
    });
    setState({ ...state, questions });
    window.$("#addDependentModal").modal("toggle");
  };

  return (
    <div
      className="modal fade"
      id="addDependentModal"
      tabIndex="-1"
      aria-hidden="true"
      data-toggle="modal"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Seleccionar pregunta madre
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <label class="form-label">Pregunta</label>
            <select
              className="form-select"
              onChange={(e) => onQuestionChange(e.target.value)}
            >
              <option value="">--</option>
              {questionOptions()}
            </select>
            <label class="form-label">Respuesta</label>
            <select
              className="form-select"
              onChange={(e) => onAnswerChange(e.target.value)}
            >
              <option value="">--</option>
              {answerOptions()}
            </select>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={asing}>
              Asignar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDependent;
