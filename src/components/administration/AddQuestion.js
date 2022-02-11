import React, { isValidElement, useEffect, useState } from "react";
import Answer from "./Answer";
import { v4 as uuidv4 } from "uuid";
import { ALFABET } from "../../common/constants";

const AddQuestion = ({ state, setState, selectedQuestion }) => {
  const [question, setQuestion] = useState({ text: "", answers: [] });
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setQuestion(selectedQuestion);
  }, [selectedQuestion]);

  const renderAnswers = () => {
    if (!question.answers) return null;
    return question.answers.map((answer) => {
      return (
        <Answer
          key={answer._id || answer.tempId}
          answer={answer}
          question={question}
          setQuestion={setQuestion}
        />
      );
    });
  };

  const addAnswer = () => {
    const answer = {
      letter: ALFABET[question.answers.length],
      tempId: uuidv4(),
      pendingSave: true,
      text: "",
    };
    const answers = [...question.answers, answer];
    setQuestion({ ...question, answers });
    setValid(true);
  };

  const addOrQuestion = () => {
    if (!isValid()) return setValid(false);

    if (question._id || question.tempId) {
      updateQuestion();
    } else {
      addQuestion();
    }

    setQuestion({ text: "", answers: [] });
    setValid(true);
  };

  const addQuestion = () => {
    setState({
      ...state,
      questions: [
        ...state.questions,
        {
          text: question.text,
          answers: question.answers,
          tempId: uuidv4(),
          pendingSave: true,
          index: state.questions.length + 1,
        },
      ],
    });
  };
  const updateQuestion = () => {
    const questionsUpdated = state.questions.map((q) =>
      q._id === question._id || (q.tempId && q.tempId === question.tempId)
        ? question
        : q
    );
    setState({
      ...state,
      questions: questionsUpdated,
    });
  };

  const isValid = () => {
    return (
      question.text &&
      question.answers.length > 0 &&
      !question.answers.some((x) => x.text === "")
    );
  };

  return (
    <div
      className="modal fade"
      id="addQuestionModal"
      tabIndex="-1"
      aria-hidden="true"
      data-toggle="modal"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Preguntas
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <label htmlFor="" className="form-label">
              Pregunta
            </label>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                setQuestion({ ...question, text: e.target.value })
              }
              className="form-control"
            ></input>
            <div className="mb-2"></div>
            {renderAnswers()}
            <a href="#" onClick={addAnswer}>
              Agregar Respuesta
            </a>
            <div className="mb-2"></div>
            <div className="alert alert-danger" hidden={valid} role="alert">
              Debe agregar las preguntas y respuestas
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addOrQuestion}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
