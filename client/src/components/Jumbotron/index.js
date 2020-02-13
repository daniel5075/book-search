import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: 160,
        clear: "both",
        paddingTop: 40,
        textAlign: "center"
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
