import React from "react";
import Landing from "./Landing";
import "./custumer.css";
import { MemoryRouter, Route } from "react-router";
import QuestionList from "./QuestionList";
import { Link } from "react-router-dom";
import MailForm from "./MailForm";

function Custumer() {
  return (
    <MemoryRouter>
      <div className="box">
        <div class="row header">
          <Link to="/">
            <img src="./consultate-logo.jpg"></img>
          </Link>
        </div>
        <div className="row content">
          <switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/questionnaire">
              <QuestionList />
            </Route>
            <Route path="/mailForm">
              <MailForm />
            </Route>
          </switch>
        </div>
      </div>
    </MemoryRouter>
  );
}

export default Custumer;
