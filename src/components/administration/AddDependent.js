import React, { isValidElement, useEffect, useRef, useState } from "react";
import Dependents from "./Dependents";

const AddDependent = ({ state, setState, selectedQuestion }) => {
  const [question, setQuestion] = useState({ questionId: "" });
  const [dependentQuestions, setDependentQuestions] = useState([]);
  const [answer, setAnswer] = useState({});

  const questionOptions = () => {
    return state?.questions
      ?.filter((quest) => quest.index != selectedQuestion.index)
      .map((quest) => {
        return (
          <option key={quest._id} value={quest._id}>
            {quest.text}
          </option>
        );
      });
  };

  useEffect(() => {
    setDependentQuestions(selectedQuestion.dependentQuestions ?? []);
    //onQuestionChange(selectedQuestion.denpentQuestion);

    setQuestion({ questionId: "" });
    setAnswer(null);
  }, [selectedQuestion]);

  const answerOptions = () => {
    return question?.answers?.map((answ) => {
      return (
        <option
          key={answ._id}
          //selected={selectedQuestion.dependentAnswer === answ._id}
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
    setAnswer(null);
  };

  const onAnswerChange = (id) => {
    const answer = question?.answers?.find((a) => a._id === id);
    setAnswer(answer);
  };

  const deleteDependent = (dependent) => {
    const dependentsFiltered = dependentQuestions.filter((d) => {
      return (
        d.questionId !== dependent.questionId &&
        d.answerId !== dependent.answerId
      );
    });
    setDependentQuestions(dependentsFiltered);
  };

  const asing = () => {
    //{questionId, qustionText,answerId, answerId}
    const newRow = {
      questionId: question?._id,
      questionText: question?.text,
      answerId: answer?._id,
      answerText: answer?.text,
    };

    const isDuplicate = dependentQuestions.some((dependent) => {
      return (
        dependent.questionId === newRow.questionId &&
        dependent.answerId === newRow.answerId
      );
    });

    if (
      isDuplicate ||
      newRow.questionId === undefined ||
      newRow.answerId === undefined
    )
      return;

    setDependentQuestions([...dependentQuestions, newRow]);

    //window.$("#addDependentModal").modal("toggle");
  };

  useEffect(() => {
    const questions = state?.questions?.map((q) => {
      if (q._id !== selectedQuestion._id) return q;
      return {
        ...q,
        dependentQuestions: dependentQuestions,
      };
    });
    setState({ ...state, questions });
  }, [dependentQuestions]);

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
              value={question?.questionId}
            >
              <option value="" defaultValue>
                --
              </option>
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

            <Dependents
              dependentQuestions={dependentQuestions}
              deleteDependent={deleteDependent}
            />
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
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDependent;
