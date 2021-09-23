import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchQuestionnaire, fetchRules } from "../../actions";

import Modal from "../Modal";
import AddRuleModal from "./AddRuleModal";
import DeleteRuleModal from "./DeleteRuleModal";

function AnswersValue({
  questionnaire,
  fetchQuestionnaire,
  fetchRules,
  rules,
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
          <div class="ui large label">
            {rule.ruleName}
            <div class="detail">Valor: {rule.ruleValue}</div>
          </div>
          {renderQuestionsRule(rule.questionsRule)}
          <div className="ui buttons">
            <button
              class="ui small negative button"
              onClick={() => deleteRule(rule)}
            >
              <i class="trash small icon"></i>
              {/*Delete*/}
            </button>
          </div>
        </div>
      );
    });
  };

  const renderQuestionsRule = (questions) => {
    return questions.map((question) => {
      return (
        <div class="ui list">
          <div class="item">
            <i class="question circle icon"></i>
            <div class="content">
              <div class="header">{question.text}</div>
              {renderAnswersRule(question.answers)}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderAnswersRule = (answers) => {
    return answers.map((answer) => {
      return <div class="description">{answer.text}</div>;
    });
  };

  const onDismiss = () => {
    setSelectedRule(null);
    setShowModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div class="ui menu">
        <Link to="/Questionnaire/" class="item">
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

      <Modal show={showModal} onDismiss={onDismiss}>
        <div className="ui segment">
          <AddRuleModal
            questionnaire={questionnaire}
            onDismiss={onDismiss}
            selectedRule={selectedRule}
          />
        </div>
      </Modal>

      <DeleteRuleModal
        show={showDeleteModal}
        onDismiss={onDismiss}
        selectedRule={selectedRule}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { questionnaire: state.questionnaire, rules: state.rules };
};

export default connect(mapStateToProps, { fetchQuestionnaire, fetchRules })(
  AnswersValue
);
