import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchRecomendation, deleteRecomendation } from "../../../actions";

import AddModal from "./AddModal";

function Recomendation({
  fetchRecomendation,
  recomendations,
  current,
  deleteRecomendation,
}) {
  const [addModal, setAddModal] = useState({ show: false });

  const renderRecomendations = () => {
    return recomendations.map((recomendation) => {
      return (
        <tr>
          <td>{recomendation.recomendation}</td>
          <td>{recomendation.secondRecomendation}</td>
          <td>{recomendation.secondRecomendation}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchRecomendation();
  }, []);
  return (
    <div classNameName="ui segment">
      <AddModal
        show={addModal.show}
        onDismiss={() => setAddModal({ ...addModal, show: false })}
      />
      <table className="ui celled   table">
        <thead>
          <tr>
            <th>Recomendación</th>
            <th>Recomendación Alternativa</th>
          </tr>
        </thead>
        <tbody>{renderRecomendations()}</tbody>
        <tfoot classNameName="full-width">
          <tr>
            <th></th>
            <th colspan="2">
              <div
                className="ui right floated small primary labeled icon button"
                onClick={() =>
                  setAddModal({ ...addModal, show: true, current: current })
                }
              >
                <i className="pencil alternate icon"></i> Agregar Recomendación
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    recomendations: state.recomendations.all,
    current: state.recomendations.current,
  };
};

export default connect(mapStateToProp, {
  fetchRecomendation,
  deleteRecomendation,
})(Recomendation);
