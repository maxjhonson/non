import React, { useEffect, useState } from "react";
import Answer from "../../components/Questionnaire/Answer";
import { v4 as uuidv4 } from "uuid";
import { ALFABET } from "../../../common/config";

const AddQuestion = ({ state, setState }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [valid, setValid] = useState(true);

  const renderAnswers = () => {
    if (!answers) return null;
    return answers.map((answer) => {
      return (
        <Answer
          key={answer._id || answer.tempId}
          answer={answer}
          answers={answers}
          setAnswers={setAnswers}
        />
      );
    });
  };

  const addAnswer = () => {
    setValid(true);
    setAnswers([
      ...answers,
      {
        letter: ALFABET[answers.length],
        tempId: uuidv4(),
        pendingSave: true,
        text: "",
      },
    ]);
  };

  const addQuestion = () => {
    if (!question || answers.length <= 0 || answers.some((x) => x.text === ""))
      return setValid(false);
    setState({
      ...state,
      questions: [
        ...state.questions,
        {
          text: question,
          answers: answers,
          tempId: uuidv4(),
          pendingSave: true,
          index: state.questions.length + 1,
        },
      ],
    });
    setQuestion("");
    setAnswers([]);
    setValid(true);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
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
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
              onClick={addQuestion}
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
