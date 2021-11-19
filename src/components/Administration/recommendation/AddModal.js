import React from "react";
import Modal from "../../Modal/Modal";

function AddModal(props) {
  return (
    <Modal show={props.show}>
      <div className="ui form">
        <div className="field">
          <label>Recomendación</label>
          <textarea rows="2"></textarea>
        </div>
        <div className="field">
          <label>Recomendación Alterna</label>
          <textarea rows="2"></textarea>
        </div>
        <div class="ui submit button">Guardar</div>
      </div>
    </Modal>
  );
}

export default AddModal;
