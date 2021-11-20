import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import {
  fetchRecomendation,
  addRecomendation,
  updateRecomendation,
} from "../../../actions";
import { connect } from "react-redux";

function AddModal({
  show,
  recomendations,
  onDismiss,
  addRecomendation,
  updateRecomendation,
  current,
}) {
  const [recomendation, setRecomendation] = useState("");
  const [secondRecomendation, setSecondRecomendation] = useState("");

  const save = () => {
    console.log(current);
    if (current || current?._id) {
      updateRecomendation(current._id, recomendation, secondRecomendation);
    } else {
      addRecomendation(recomendation, secondRecomendation);
    }
    onDismiss();
  };
  console.log(current);
  useEffect(() => {
    setSecondRecomendation(current?.secondRecomendation);
    setRecomendation(current?.recomendation);
  }, [show]);

  return (
    <Modal show={show} onDismiss={onDismiss}>
      <div className="ui form">
        <div className="field">
          <label>Recomendación</label>
          <textarea
            onChange={(e) => setRecomendation(e.target.value)}
            value={recomendation}
            rows="2"
          ></textarea>
        </div>
        <div className="field">
          <label>Recomendación Alterna</label>
          <textarea
            value={secondRecomendation}
            onChange={(e) => setSecondRecomendation(e.target.value)}
            rows="2"
          ></textarea>
        </div>
        <div class="ui primary submit button" onClick={save}>
          Guardar
        </div>
        <div class="ui submit button" onClick={onDismiss}>
          Cancelar
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProp = (state) => {
  return { recomendations: state.recomendations.all };
};

export default connect(mapStateToProp, {
  fetchRecomendation,
  addRecomendation,
  updateRecomendation,
})(AddModal);
