import React, { Component } from "react";
import { ALGORITHMS, ALGORITHMS_CONFIG } from "./config";
import Visualiser from "./components/Visualiser";

export default class AlgorithmVisualiser extends Component {
  render() {
    const { currentlySelectedAlgorithm } = this.props;
    return (
      <Visualiser
        logic={ALGORITHMS_CONFIG[currentlySelectedAlgorithm].LOGIC}
        w={ALGORITHMS_CONFIG[currentlySelectedAlgorithm].W}
        useArrayForDraw={ALGORITHMS_CONFIG[currentlySelectedAlgorithm].USE_ARRAY_FOR_DRAW}
      />
    );
  }
}

export { ALGORITHMS, ALGORITHMS_CONFIG };


