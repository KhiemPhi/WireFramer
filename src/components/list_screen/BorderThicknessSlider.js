import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import { Range } from "react-materialize";

class BorderThicknessSlider extends Component {
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (!this.node.contains(e.target)) {
     
        this.props.toggleBorderThicknessSlider();
      
    }
  };

  render() {
    // x = left , y = top value, width = widht, height = height
    return (
      <div
        ref={node => (this.node = node)}
       
      >
        <Range id = "border_thickness_input" max="100" min="0" type = "range" onChange = {e => this.props.handleBorderThicknessChange(e.target.value)} ></Range>
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "WireFrames" }]))(
  BorderThicknessSlider
);
