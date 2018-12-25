import React, { Component } from "react";
import "./App.css";
import Board from "./components/board";
import NavBar from "./components/navbar";

//
// Vass Cisse
//

// The only source of truth

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bubbles: [],
      score: 0,
      previousScore: 0,
      count_bonus_10: 0,
      count_bonus_100: 0
    };

    //Do not need to be in the state
    this.maxWidth = 14;
    this.maxHeight = 10;
    this.activeColors = ["#E94F37", "#1C89BF", "#A1D363", "#393E41"];
    this.deletedColor = "#d5d9da";
    this.bonus_10 = 10;
    this.bonus_100 = 100;
  }

  startNewGame = () => {
    let bubbles = [];
    let count = 1;
    for (var i = 0; i < this.maxHeight; i++) {
      for (var j = 0; j < this.maxWidth; j++) {
        let obj = {
          id: count,
          x: i,
          y: j,
          color: this.activeColors[
            Math.floor(Math.random() * this.activeColors.length)
          ]
        };
        bubbles.push(obj);
        count++;
      }
    }

    let previousScore = this.state.score;

    this.setState({
      bubbles: bubbles,
      previousScore: previousScore,
      score: 0,
      count_bonus_10: 0,
      count_bonus_100: 0
    });
  };

  componentDidMount() {
    this.startNewGame();
  }

  isNotNull = value => {
    return typeof value != "undefined" && value;
  };

  getBubbleAt = (i, j, bubbles) => {
    let obj = bubbles.filter(b => {
      return b.x === i && b.y === j;
    });
    return this.isNotNull(obj) ? obj[0] : null;
  };

  handleDelete = bubble => {
    if (bubble.color === this.deletedColor) {
      return;
    }

    //Using spread operator to clone the array
    let bubbles = [...this.state.bubbles];

    this.delete(bubble.color, bubble, bubbles);

    let total = this.state.score;
    let count_bonus_10 = this.state.count_bonus_10;
    let count_bonus_100 = this.state.count_bonus_100;

    let movedCount = this.moveDownAll(bubbles, 0);

    //bonus
    if (movedCount >= 10) {
      movedCount += this.bonus_100;
      count_bonus_100 += 1;
    } else if (movedCount >= 5) {
      movedCount += this.bonus_10;
      count_bonus_10 += 1;
    }

    total += movedCount;

    this.setState({
      bubbles: bubbles,
      score: total,
      count_bonus_10: count_bonus_10,
      count_bonus_100: count_bonus_100
    });
  };

  delete = (color, bubble, bubbles) => {
    if (this.isNotNull(bubble)) {
      let i = bubble.x;
      let j = bubble.y;
      let valid =
        i >= 0 &&
        i < this.maxHeight &&
        j >= 0 &&
        j < this.maxWidth &&
        color === bubble.color;

      if (valid) {
        // Mark targeted bubble as deleted
        const index = bubbles.indexOf(bubble);
        bubbles[index] = { ...bubble };
        bubbles[index].color = this.deletedColor;

        //recursive call for bubbles around
        this.delete(color, this.getBubbleAt(i - 1, j, bubbles), bubbles);
        this.delete(color, this.getBubbleAt(i + 1, j, bubbles), bubbles);
        this.delete(color, this.getBubbleAt(i, j - 1, bubbles), bubbles);
        this.delete(color, this.getBubbleAt(i, j + 1, bubbles), bubbles);
      }
    }
  };

  moveDownAll = (bubbles, total) => {
    let counts = 0;

    for (var i = 0; i < this.maxHeight; i++) {
      for (var j = 0; j < this.maxWidth; j++) {
        if (i + 1 < this.maxHeight) {
          let bubble = this.getBubbleAt(i, j, bubbles);
          let belowBubble = this.getBubbleAt(i + 1, j, bubbles);
          if (this.isNotNull(bubble) && this.isNotNull(belowBubble)) {
            counts += this.moveDownBubble(belowBubble, bubble, bubbles);
          }
        }
      }
    }

    total += counts;

    if (counts > 0) {
      this.moveDownAll(bubbles, total);
    }

    return total;
  };

  moveDownBubble = (belowBubble, bubble, bubbles) => {
    if (
      belowBubble.color === this.deletedColor &&
      bubble.color !== this.deletedColor
    ) {
      const index1 = bubbles.indexOf(bubble);
      bubbles[index1] = { ...bubble };

      const index2 = bubbles.indexOf(belowBubble);
      bubbles[index2] = { ...belowBubble };

      let tmpColor = belowBubble.color;
      bubbles[index2].color = bubble.color;
      bubbles[index1].color = tmpColor;

      return 1;
    }

    return 0;
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          previousScore={this.state.previousScore}
          score={this.state.score}
          onStartNewGame={this.startNewGame}
        />
        <main className="container m-2">
          <div className="row">
            <div className="col-sm">
              <Board
                bubbles={this.state.bubbles}
                onDelete={this.handleDelete}
              />
            </div>
            <div className="col-sm">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center col-lg-9">
                  Bonus +10
                  <span className="badge badge-primary badge-pill">
                    {this.state.count_bonus_10}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center col-lg-9">
                  Bonus +100
                  <span className="badge badge-primary badge-pill">
                    {this.state.count_bonus_100}
                  </span>
                </li>
              </ul>
              <br />
              {this.state.score >= 500 && (
                <div className="alert alert-success col-lg-9" role="alert">
                  Congratulations! You won!
                </div>
              )}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
