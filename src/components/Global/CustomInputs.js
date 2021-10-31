import React from "react";

export const InputWithValidation = ({ props, meta, label }) => {
  return (
    <div className="ui input error">
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export const SimpleSpan = ({ input }) => {
  return <span>{input.value}</span>;
};
