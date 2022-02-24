import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchRecomendation, deleteRecomendation } from "../../../actions";
import Loading from "../../Global/Loading";

import AddModal from "./AddModal";

function Recomendation({
  fetchRecomendation,
  recomendations,
  current,
  deleteRecomendation,
  loading,
}) {
  const [addModal, setAddModal] = useState({ show: false });

  const renderRecomendations = () => {
    return recomendations.map((recomendation) => {
      return (
        <tr>
          <td>{recomendation.recomendation}</td>
          <td>{recomendation.secondRecomendation}</td>
          <td>
            <button onClick={() => setAddModal({ show: true, current: recomendation })}>
              Editar
            </button>
          </td>
          <td className="right aligned">
            <button onClick={() => deleteRecomendation(recomendation._id)}>
              Eliminar
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchRecomendation();
  }, []);

  if (loading) {
    return (
      <div className={`ui  active  inverted dimmer`}>
        <div className="ui text loader">Cargando</div>
      </div>
    );
  }
  return (
    <div classNameName="ui segment">
      <AddModal
        show={addModal.show}
        current={addModal.current}
        onDismiss={() => setAddModal({ ...addModal, show: false, current: {} })}
      />
      <table className="ui celled   table">
        <thead>
          <tr>
            <th>Recomendación</th>
            <th>Recomendación Alternativa</th>
            <th className="collapsing"> </th>
            <th className="collapsing"> </th>
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
                  setAddModal({
                    ...addModal,
                    show: true,
                    current: current,
                    recomendations: recomendations,
                  })
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
    loading: state.loading,
  };
};

export default connect(mapStateToProp, {
  fetchRecomendation,
  deleteRecomendation,
})(Recomendation);
