import React from "react";

//
// Vass Cisse
//

// Stateless Functional Component
const Bubble = props => {
  var bubbleStyle = {
    padding: 3,
    margin: 3,
    display: "inline-block",
    backgroundColor: props.bubble.color,
    borderRadius: "50%",
    width: 40,
    height: 40
  };

  return (
    <div style={bubbleStyle} onClick={() => props.onDelete(props.bubble)} />
  );
};

export default Bubble;
