import React, { useEffect } from "react";
import ReactDom from "react-dom";

function Modal({ children, show, onDismiss }) {
  if (!show) return null;
  window.scroll(0, 0);

  return ReactDom.createPortal(
    <div className="ui dimmer modals visible active" onClick={onDismiss}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui segment"
        style={{ minWidth: "50%" }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
