import React from "react";

const Dependents = ({ dependentQuestions, deleteDependent }) => {
  const renderDependentQuestions = () => {
    return dependentQuestions?.map((dependent) => {
      return (
        <tr key={`${dependent.questionId}${dependent.answerId}`}>
          <td>{dependent.questionText}</td>
          <td>{dependent.answerText}</td>
          <td>
            <button
              onClick={() => deleteDependent(dependent)}
              className="btn btn-danger"
            >
              x
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Pregunta</th>
            <th>Respuesta</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderDependentQuestions()}</tbody>
      </table>
    </div>
  );
};

export default Dependents;
