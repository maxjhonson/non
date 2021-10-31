import React from "react";
import "./custumer.css";

const renderAnswer = () => {
  return (
    <div className="ui segment answer-segment">
      <h3 className="ui header"> Respuesta XXX</h3>
      {/* <i className="green circular check  icon"></i> */}
    </div>
  );
};

const Question = (props) => {
  return (
    <div className="question-container">
      <div className="ui grid">
        <div class="two wide column">
          <button type="button" style={{ background: "none", border: "none" }}>
            <h3>
              <i className="arrow left icon"></i>
            </h3>
          </button>
        </div>
        <div className="fourteen wide column">
          <h2 className="ui header">Cuando fue la ultima vez que viajó?</h2>
        </div>
      </div>

      {renderAnswer()}
      {renderAnswer()}
      {renderAnswer()}
      {renderAnswer()}
    </div>
  );
};

export default Question;
