import React, { useEffect, useState } from "react";
import { ALFABET } from "../../../common/config";

const Answer = ({ answer, answers, setAnswers }) => {
  // const [answerState, setAnswerState] = useState({...answer});
  const [text, setText] = useState(answer.text);

  const deleteAnswer = (e, id, isSaved) => {
    e.preventDefault();
    const answersFiltered = answers
      .filter((answer) => answer._id !== id && answer.tempId !== id)
      .map((ans, i) => {
        return { ...ans, letter: ALFABET[i] };
      });
    setAnswers(answersFiltered);
  };

  const updateText = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const answersUpdated = answers.map((ans) => {
        return ans._id === answer._id && ans.tempId === answer.tempId
          ? { ...ans, text: text }
          : ans;
      });
      setAnswers(answersUpdated);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [text]);

  return (
    <div className="col-9">
      <div className="input-group mb-3">
        <span className="input-group-text"> {answer?.letter}</span>
        <input
          type="text"
          className="form-control has-validation"
          value={text}
          onChange={updateText}
        />

        <span className="input-group-text">
          <a
            onClick={(e) => deleteAnswer(e, answer._id || answer.tempId)}
            href="#"
          >
            X
          </a>
        </span>
      </div>
    </div>
  );
};

export default Answer;
