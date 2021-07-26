import React from "react";

const Question = ({ question }) => {
  const { id, order, questionText, answers } = question;
  const answersRendered = answers?.map((answer) => {
    return (
      <div className="form-check" key={`${id}${answer.letter}`}>
        <input className="form-check-input" type="radio" name={id} id="{id}" />
        <label className="form-check-label" htmlFor="flexRadioDisabled">
          {answer.letter}) {answer.text}
        </label>
      </div>
    );
  });

  return (
    <div className="post-preview">
      <h5 className="post-subtitle">
        {order}) {questionText}
      </h5>
      {answersRendered}
      <hr className="my-4" />
    </div>
  );
};

export default Question;
