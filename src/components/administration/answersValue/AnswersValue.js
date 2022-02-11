import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  fetchQuestionnaire,
  fetchRules,
  fetchRecomendation,
  updateQuestionnaire,
} from "../../../actions";
import AddCalificationRecomendationModal from "./AddCalificationRecomendationModal";

import AddRuleModal from "./AddRuleModal";
import AddRuleRecomendationModal from "./AddRuleRecomendationModal";
import DeleteRuleModal from "./DeleteRuleModal";

function AnswersValue({
  questionnaire,
  fetchQuestionnaire,
  fetchRules,
  rules,
  loading,
  fetchRecomendation,
  recomendations,
  updateQuestionnaire,
}) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRecomendationModal, setShowRecomendationModal] = useState(false);
  const [showAddRuleRecomendation, setShowAddRuleRecomendation] =
    useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  useEffect(() => {
    fetchRules(id);
    fetchQuestionnaire(id);
    fetchRecomendation();
  }, []);

  const deleteRule = (rule) => {
    setSelectedRule(rule);
    setShowDeleteModal(true);
  };

  const addRuleRecomendation = (rule) => {
    setSelectedRule(rule);
    setShowAddRuleRecomendation(true);
  };

  const closeAddRuleRecomendationModal = () => {
    setSelectedRule(null);
    setShowAddRuleRecomendation(false);
  };

  const closeShowRecomendationModal = () => {
    setShowRecomendationModal(false);
  };

  const renderRules = () => {
    return rules.map((rule) => {
      return (
        <div className="ui segment">
          <div className="ui large label">
            {rule.ruleName}
            <div className="detail">Valor: {rule.ruleValue}</div>
          </div>
          {renderQuestionsRule(rule.questionsRule)}
          <button
            className="ui small primary button"
            onClick={() => addRuleRecomendation(rule)}
          >
            Recomendación
          </button>
          <button
            className="ui small negative button"
            onClick={() => deleteRule(rule)}
          >
            <i className="trash small icon"></i>Eliminar
          </button>
        </div>
      );
    });
  };

  const renderQuestionsRule = (questions) => {
    return questions?.map((question) => {
      return (
        <div className="ui list">
          <div className="item">
            <i className="question circle icon"></i>
            <div className="content">
              <div className="header">{question.text}</div>
              {renderAnswersRule(question.answers)}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderAnswersRule = (answers) => {
    return answers.map((answer) => {
      return <div className="description">{answer.text}</div>;
    });
  };

  const onDismiss = () => {
    setSelectedRule(null);
    setShowModal(false);
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className={`ui  active  inverted dimmer`}>
        <div className="ui text loader">Cargando</div>
      </div>
    );
  }

  return (
    <div>
      <div className="ui menu">
        <Link to="/Questionnaire/" className="item">
          Volver atras
        </Link>
      </div>
      <div className="ui segment">
        <div className="ui segment">
          {!questionnaire && <div>El formulario está cargando.......</div>}
          <h4 className="header">{questionnaire?.formName}</h4>
          {renderRules()}
          <button
            className="ui primary button"
            onClick={() => setShowModal(true)}
          >
            Agregar Regla
          </button>
          <button
            className="ui primary button"
            onClick={() => setShowRecomendationModal(true)}
          >
            Recomendacion por Puntuacion
          </button>
        </div>
      </div>

      <AddRuleModal
        show={showModal}
        questionnaire={questionnaire}
        onDismiss={onDismiss}
        selectedRule={selectedRule}
      />

      <DeleteRuleModal
        show={showDeleteModal}
        onDismiss={onDismiss}
        selectedRule={selectedRule}
      />

      <AddRuleRecomendationModal
        show={showAddRuleRecomendation}
        onDismiss={closeAddRuleRecomendationModal}
        recomendations={recomendations}
        selectedRule={selectedRule}
      />
      {questionnaire && showRecomendationModal && (
        <AddCalificationRecomendationModal
          show={showRecomendationModal}
          onDismiss={closeShowRecomendationModal}
          recomendations={recomendations}
          questionnaire={questionnaire}
          updateQuestionnaire={updateQuestionnaire}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    questionnaire: state.questionnaires.current,
    rules: state.rules,
    recomendations: state.recomendations.all,
  };
};

export default connect(mapStateToProps, {
  fetchQuestionnaire,
  fetchRules,
  fetchRecomendation,
  updateQuestionnaire,
})(AnswersValue);
