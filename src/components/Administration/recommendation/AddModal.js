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
  const [magnitude, setMagnitude] = useState();
  const [asociatedRecomendations, setAsociatedRecomendations] = useState([]);

  const save = () => {
    if (current || current?._id) {
      updateRecomendation(
        current._id,
        recomendation,
        secondRecomendation,
        magnitude,
        asociatedRecomendations
      );
    } else {
      addRecomendation(
        recomendation,
        secondRecomendation,
        magnitude,
        asociatedRecomendations
      );
    }
    onDismiss();
  };

  useEffect(() => {
    setSecondRecomendation(current?.secondRecomendation);
    setRecomendation(current?.recomendation);
    setMagnitude(current?.magnitude);
    setAsociatedRecomendations(current?.asociatedRecomendations ?? []);
  }, [show]);

  const asociateRecomendation = (e, _id) => {
    if (e.target.checked) setAsociatedRecomendations([...asociatedRecomendations, _id]);
    else setAsociatedRecomendations(asociatedRecomendations?.filter((x) => x !== _id));
  };

  const renderRecomendations = () => {
    return recomendations
      .filter((x) => x._id !== current?._id)
      .map(({ _id, recomendation }) => {
        const selected = asociatedRecomendations?.includes(_id);
        return (
          <tr key={_id}>
            <td>
              <input
                checked={selected}
                onChange={(e) => asociateRecomendation(e, _id)}
                type="checkbox"
              />
            </td>
            <td>{recomendation}</td>
          </tr>
        );
      });
  };

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
        <div className="field">
          <label>Importancia</label>
          <input
            value={magnitude}
            onChange={(e) => setMagnitude(e.target.value)}
            type="number"
          ></input>
        </div>
        <div className="field">
          <label>Asociar</label>
          <table class="ui celled table">
            <thead>
              <tr>
                <th className="collapsing"></th>
                <th>Regla</th>
              </tr>
            </thead>
            <tbody>{renderRecomendations()}</tbody>
          </table>
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
