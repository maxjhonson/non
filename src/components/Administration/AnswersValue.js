import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchQuestionnaire, fetchRules } from "../../actions";

import AddRuleModal from "./AddRuleModal";
import DeleteRuleModal from "./DeleteRuleModal";

function AnswersValue({
  questionnaire,
  fetchQuestionnaire,
  fetchRules,
  rules,
  loading,
}) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  useEffect(() => {
    fetchRules(id);
    fetchQuestionnaire(id);
  }, []);

  const deleteRule = (rule) => {
    setSelectedRule(rule);
    setShowDeleteModal(true);
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
          <div className="ui buttons">
            <button
              className="ui small negative button"
              onClick={() => deleteRule(rule)}
            >
              <i className="trash small icon"></i>
              {/*Delete*/}
            </button>
          </div>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    questionnaire: state.questionnaires.current,
    rules: state.rules,
  };
};

export default connect(mapStateToProps, { fetchQuestionnaire, fetchRules })(
  AnswersValue
);
