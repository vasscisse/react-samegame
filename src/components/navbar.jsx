import React from "react";

//
// Vass Cisse
//

// Stateless Functional Component
const NavBar = props => {
  return (
    <nav className="navbar navbar-brand bg-light">
      <button
        type="button"
        onClick={props.onStartNewGame}
        className="btn btn-secondary m-2"
      >
        New Game
      </button>
      <button type="button" className="btn btn-info m-2" disabled>
        Previous Score{" "}
        <span className="badge badge-light">{props.previousScore}</span>
      </button>
      <button type="button" className="btn btn-info m-2" disabled>
        Current Score <span className="badge badge-light">{props.score}</span>
      </button>
      <span className="badge badge-pill badge-light">
        React Samegame v0.1.0, developed by Vass Cisse © 2018
      </span>
    </nav>
  );
};

export default NavBar;
