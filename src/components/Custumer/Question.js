import React from "react";
import "./custumer.css";

const Question = ({
  index,
  question,
  nextQuestion,
  selectAnswer,
  previousQuestion,
}) => {
  const renderAnswer = (answers) => {
    return answers.map(({ _id, text }, i) => {
      return (
        <React.Fragment>
          <div
            onClick={() => selectAnswer(index, i)}
            class="ui grid  ui segment  answer-segment "
          >
            <div className="fourteen wide column ">
              <div key={_id} className="">
                <h3 className="ui header">{text}</h3>
              </div>
            </div>
            <div className="two wide column">
              {question.selectedAnswerId === _id && (
                <i className="check icon" style={{ color: "#5BBFBA" }} />
              )}
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="question-container">
      <div className="ui grid mb-5">
        <div class="two wide column">
          <button
            onClick={previousQuestion}
            type="button"
            style={{ background: "none", border: "none" }}
          >
            <h3>
              <i className="arrow left icon"></i>
            </h3>
          </button>
        </div>
        <div className="fourteen wide column">
          <h2 className="ui header">{question.text}</h2>
        </div>
      </div>
      {renderAnswer(question.answers)}
      <div className="continue-footer-bar">
        <button
          disabled={!question.selectedAnswerId}
          onClick={() => nextQuestion(index)}
          className="landing-content-button"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Question;
