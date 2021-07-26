import React from "react";
import { Link } from "react-router-dom";

const CountrySelection = () => {
  return (
    <div className="card-group" style={{ justifyContent: "space-around" }}>
      <Link to="/q_usa">
        <div className="card" style={{ maxWidth: "540px" }}>
          <img
            src="../assets/img/flag_usa.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Estados Unidos</h5>
          </div>
        </div>
      </Link>
      <Link to="">
        <div className="card" style={{ maxWidth: "540px" }}>
          <img
            src="../assets/img/flag_eu.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Union Europea</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CountrySelection;

//
