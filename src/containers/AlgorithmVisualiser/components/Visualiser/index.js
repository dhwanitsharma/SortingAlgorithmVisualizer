import React, { Component } from "react";
import Sketch from "react-p5";

export default class AlgorithmVisualiser extends Component {
  states = [];
  values = [];


  setup = ({ p5, canvasParentRef, w = 10 }) => {
    window.valueArrays = []
    p5.createCanvas(1000, 500).parent(canvasParentRef);

    this.values = new Array(p5.floor(p5.width / w));
    this.valueArrays = window.valueArray
    this.states = [];
    for (let i = 0; i < this.values.length; i++) {
      this.values[i] = p5.random(p5.height);
      this.states[i] = -1;
    }

    this.props.logic(this.values, this.states);
  };

  draw = ({ p5, w }) => {
    const { useArrayForDraw } = this.props;
    p5.background(0);
    if (useArrayForDraw) {
      debugger;
      for (let i = 0; i < window.valueArrays.length; i++) {
        p5.noStroke();
        p5.stroke(100, 143, 143);
        if (this.states[i] === 0) { 
          window.valueArrays = [];
          p5.fill(255, 0, 0);
        } else if (this.states[i] === 1) {
          p5.fill(0, 255, 0);
        } else p5.fill(100);
        p5.rect(i * w, p5.height, w, - window.valueArrays[i], 20);
      }
    } else {
      for (let i = 0; i < this.values.length; i++) {
        p5.noStroke();
        p5.stroke(100, 143, 143);
        if (this.states[i] === 0) {
          p5.fill(255, 0, 0);
        } else if (this.states[i] === 1) {
          p5.fill(0, 255, 0);
        } else p5.fill(100);
        p5.rect(i * w, p5.height, w, -this.values[i], 20);
      }
    }
  };

  render() {
    const { w } = this.props;

    return (
      <Sketch
        setup={(p5, canvasParentRef) =>
          this.setup({
            p5,
            canvasParentRef,
            w,
          })
        }
        draw={(p5) =>
          this.draw({
            p5,
            w,
          })
        }
      />
    );
  }
}
