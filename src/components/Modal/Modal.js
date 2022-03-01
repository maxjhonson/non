import React, { useEffect } from "react";
import ReactDom from "react-dom";
import "./Modal.css";

function Modal({ children, show, onDismiss }) {
  if (!show) return null;
  //window.scroll(0, 0);

  return ReactDom.createPortal(
    <div className="globa-modal" onClick={onDismiss}>
      <div className="modal-content">
        <button
          style={{ width: "50px", borderRadius: "50px", alignSelf: "end" }}
          onClick={onDismiss}
          class="ui compact icon button"
        >
          <i class="close icon icon"></i>
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className="ui segment"
          style={{ minWidth: "50%" }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
