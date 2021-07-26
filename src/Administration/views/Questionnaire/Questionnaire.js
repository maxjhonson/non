import React, { useEffect, useState } from "react";
import coreApi from "../../../api/coreApi";
import "@fortawesome/fontawesome-free/js/all.js";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Questionnaire = () => {
  const [questionnaires, setQuestionnaires] = useState(null);
  useEffect(async () => {
    try {
      const results = await coreApi.get("/questionnaire");
      setQuestionnaires(results.data);
    } catch (e) {
      swal("Error!", "Los cuestionarios no pudieron ser cargados", "error");
    }
  }, []);

  const renderQuestionnaires = () => {
    return questionnaires?.map((questionnaire) => {
      return (
        <tr key={questionnaire._id}>
          <td>{questionnaire._id}</td>
          <td>{questionnaire.formName}</td>
          <td>
            <Link to={`/Questionnaire/create/${questionnaire._id}`}>
              <i className="fas fa-edit"></i>
            </Link>
          </td>
          <td>
            <a href="#">
              <i className="fas fa-vials"></i>
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-3 mb-3">
          <a href="Questionnaire/create" className="btn btn-primary float-end">
            Nuevo Formulario
          </a>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Codigo Formulario</th>
              <th>Nombre Formulario</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderQuestionnaires()}</tbody>
        </table>
      </div>
      {!questionnaires && <span>Cargando Formularios.......</span>}
    </div>
  );
};

export default Questionnaire;
