import React from "react";

function Loader({ active }) {
  if (!active) return null;
  return (
    <div class="ui inverted active dimmer">
      <div className="ui active loader"></div>
    </div>
  );
}

export default Loader;
