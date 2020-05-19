import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";

import AlgorithmVisualiser, {
  ALGORITHMS,
  ALGORITHMS_CONFIG,
} from "./containers/AlgorithmVisualiser";

import "./App.css";

export default class App extends Component {
  state = {
    currentlySelectedAlgorithm: ALGORITHMS.BUBBLE_SORT,
  };

  onAlgorithmChange = (newAlgorithm) => {
    this.setState({
      currentlySelectedAlgorithm: newAlgorithm,
    });
  };

  render() {
    const { currentlySelectedAlgorithm } = this.state;

    return (
      <div className="App">
        <Navigation
          allAlgorithms={ALGORITHMS}
          allAlgorithmsConfig={ALGORITHMS_CONFIG}
          onAlgorithmChange={this.onAlgorithmChange}
          currentlySelectedAlgorithm={currentlySelectedAlgorithm}
        />

        <header className="App-header">
          <h1> {ALGORITHMS_CONFIG[currentlySelectedAlgorithm].NAME}</h1>
          {ALGORITHMS_CONFIG[currentlySelectedAlgorithm].COMPLEXITY}
          <AlgorithmVisualiser
            key={currentlySelectedAlgorithm}
            currentlySelectedAlgorithm={currentlySelectedAlgorithm}
          />
        </header>
      </div>
    );
  }
}
