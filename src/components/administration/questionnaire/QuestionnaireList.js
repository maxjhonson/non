import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/js/all.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllQuestionnaires, resetQuestionnaire } from "../../../actions";

const QuestionnaireList = ({
  questionnaires,
  fetchAllQuestionnaires,
  resetQuestionnaire,
  loading,
}) => {
  useEffect(async () => {
    fetchAllQuestionnaires();
    resetQuestionnaire();
  }, []);

  const renderQuestionnaires = () => {
    return questionnaires?.map((questionnaire) => {
      return (
        <tr key={questionnaire._id}>
          <td>{questionnaire._id}</td>
          <td>{questionnaire.formName}</td>
          <td className="collapsing">
            <Link
              class="ui primary button"
              to={`/admin/questionnaire/new/${questionnaire._id}`}
            >
              <i className="pencil alternate icon"></i>
              Editar
            </Link>
          </td>

          <td className="collapsing">
            <Link
              class="ui primary button"
              to={`/admin/Questionnaire/value/${questionnaire._id}`}
            >
              <i className="chart line icon"></i>
              Valorizar
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="ui segment">
      <table class="ui celled striped table">
        <thead>
          <tr>
            <th colspan="3">Formularios de Usuarios</th>
            <th className="right aligned">
              <Link to="/admin/questionnaire/new" className="ui link">
                Nuevo Formulario
              </Link>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Codigo Formulario</th>
            <th>Nombre Formulario</th>
            <th>Editar</th>
            <th>Valorizar</th>
          </tr>
        </thead>
        <tbody>{renderQuestionnaires()}</tbody>
      </table>

      {loading && <span>Cargando Formularios.......</span>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    questionnaires: state.questionnaires.all,
    loading: state.questionnaires.loading,
  };
};

export default connect(mapStateToProps, {
  fetchAllQuestionnaires,
  resetQuestionnaire,
})(QuestionnaireList);
