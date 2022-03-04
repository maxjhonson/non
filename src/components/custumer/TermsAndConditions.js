import React from "react";

function TermsAndConditions(props) {
  return (
    <div className="box">
      <div class="row header">
        <img src="./consultate-logo.jpg"></img>
      </div>
      <div className="row content">
        <div className="ui segment" style={{ padding: "30px" }}>
          <h2 class="ui header">Terminos y Condiciones</h2>
          <div class="ui bulleted list">
            <div class="item">Termino uno</div>
            <div class="item">Termino dos</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
