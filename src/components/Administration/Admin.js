import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import NewQuestionnaire from "./Questionnaire/NewQuestionnaire";
import QuestionnaireList from "./Questionnaire/QuestionnaireList";

function Admin() {
  return (
    <div className="ui segment">
      <div className="ui  menu">
        <Link className="active item">Inicio</Link>
        <div className="left menu">
          <div className="ui simple dropdown item">
            Opciones <i className="dropdown icon"></i>
            <div className="menu">
              <Link className="item" to="/admin/questionnaire">
                Formularios de usuarios
              </Link>
              <Link className="item" to="/admin/questionnaire">
                Formularios de Flujo
              </Link>
            </div>
          </div>
        </div>
        <div className="right menu">
          <div className="item">
            <div className="ui primary button">Iniciar sección</div>
          </div>
        </div>
      </div>
      <Route path="/admin/questionnaire" exact>
        <QuestionnaireList />
      </Route>
      <Route path="/admin/questionnaire/new/:id?">
        <NewQuestionnaire />
      </Route>
    </div>
  );
}

export default Admin;
