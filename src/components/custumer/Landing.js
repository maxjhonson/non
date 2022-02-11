import React from "react";
import { Link, Route, MemoryRouter } from "react-router-dom";

function Landing(props) {
  return (
    <div className="landing">
      <div className="landing-img">
        <img className="ui fluid image" src="./landing-photo.png"></img>
      </div>
      <div className="landing-content">
        <h1 className="ui header">¡Una frase pendeja para viajar!</h1>
        <h3 className="ui header">
          Contesta a las preguntas y obten tu resultado personal
        </h3>
        <Link to="/questionnaire" className="landing-content-button">
          Continuar
        </Link>
      </div>
    </div>
  );
}

export default Landing;
