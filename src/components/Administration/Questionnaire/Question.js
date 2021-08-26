import React from "react";

const Question = ({
  state,
  question,
  deleteQuestion,
  editQuestion,
  addDependent,
}) => {
  const renderAnswers = () => {
    return question.answers?.map((answ) => {
      return (
        <div key={answ._id || answ.tempId}>
          {answ.letter}) <label>{answ.text}</label>
        </div>
      );
    });
  };

  return (
    <tr>
      <td>{question.index}</td>
      <td>
        <div className="col-12">
          <div className="form-group has-validation">
            <label>{question.text}</label>
          </div>
        </div>
      </td>
      <td>{renderAnswers()}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={(e) => addDependent(e, question)}
        >
          Asignar como dependiente{" "}
          {question.denpentQuestion && question.dependentAnswer && (
            <span class="badge bg-secondary">+</span>
          )}
        </button>
      </td>

      <td>
        <button
          className="btn btn-primary"
          onClick={(e) => editQuestion(e, question)}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteQuestion(question)}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default Question;
