import React from "react";
import { connect } from "react-redux";
import { deleteRule } from "../../../actions";
import Modal from "../../Modal/Modal";

const DeleteRuleModal = ({ show, onDismiss, deleteRule, selectedRule }) => {
  const onDeleteRuleClick = async () => {
    deleteRule(selectedRule._id, selectedRule.formId);
    onDismiss();
  };

  return (
    <Modal show={show} onDismiss={onDismiss}>
      <div>
        <div class="content">
          <div class="header">
            <h5>Eliminar Regla</h5>
          </div>
          <div class="description">{`¿Está seguro de eliminar la regla ${selectedRule?.ruleName}`}</div>
          <div class="ui divider"></div>
        </div>
        <div class="extra content">
          <div class="ui two buttons">
            <div class="ui basic red button" onClick={onDeleteRuleClick}>
              Eliminar
            </div>
            <div class="ui basic green button" onClick={onDismiss}>
              Cancelar
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default connect(null, { deleteRule })(DeleteRuleModal);
