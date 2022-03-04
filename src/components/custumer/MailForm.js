import React from "react";

function MailForm(props) {
  return (
    <div className="half-container-parent">
      <div className="half-container">
        <h1 class="ui header mb-5">
          Ingresa tu correo electrónico{" "}
          <span style={{ color: "#5BBFBA" }}> para recibir el siguiente paso</span>
        </h1>
        <div>
          <div class="ui huge icon input mb-5">
            <input type="text" placeholder="Correo Electronico" />
          </div>
        </div>
        <button className="landing-content-button">Continuar</button>
      </div>
    </div>
  );
}

export default MailForm;
