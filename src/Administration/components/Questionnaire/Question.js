import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ALFABET } from "../../../common/config";
import Answer from "./Answer";

const Question = ({ question, deleteQuestion }) => {
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
