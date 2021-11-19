import React from "react";
import AddModal from "./AddModal";

function Recomendation(props) {
  return (
    <div classNameName="ui segment">
      <AddModal show={true} />
      <table className="ui celled   table">
        <thead>
          <tr>
            <th>Recomendación</th>
            <th>Recomendación Alternativa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Lilki</td>
            <td>September 14, 2013</td>
          </tr>
        </tbody>
        <tfoot classNameName="full-width">
          <tr>
            <th></th>
            <th colspan="2">
              <div className="ui right floated small primary labeled icon button">
                <i className="pencil alternate icon"></i> Agregar Recomendación
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Recomendation;
