import React from "react";

const Loading = ({ loading }) => {
  return (
    <div className="loading" hidden={!loading}>
      <p>Loading......</p>
    </div>
  );
};

export default Loading;
