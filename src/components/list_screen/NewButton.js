import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import { Rnd } from "react-rnd";


class NewButton extends Component {
  state = {
    hasFocus: false,
    disableDragging: false
   
  };

  updateXAndYCoordinates = (data) => {
    var transform = document.getElementById(this.props.id).style.transform.toString()
    var xyValue = transform.substring(10, transform.length-1)
    var splitIndex = xyValue.indexOf(",")    
    var xString = xyValue.substring(0,splitIndex)
    var yString = xyValue.substring(splitIndex+2, xyValue.length)    
    var newX = Number(xString.substring(0, xString.length - 2 ))    
    var newY = Number(yString.substring(0, yString.length - 2 ))     
    this.props.updateXAndYCoordinatesFocusedElement(newX,newY)
  }

  updateWidthAndHeight = (data) => {
    var widthString = document.getElementById(this.props.id).style.width.toString()
    var width = Number(widthString.substring(0, widthString.length - 2 ))
    var heightString = document.getElementById(this.props.id).style.height.toString()
    var height = Number(heightString.substring(0, heightString.length - 2 ))   
    this.props.updateWidthAndHeightFocusedElement(width,height)
  }

  setFocus = () => {
    console.log(this.props.id);
    this.props.setFocusedElement(this.props.id);
    this.setState({ hasFocus: true });
    document.getElementById("text_input").value = document.getElementById(
      this.props.id
    ).textContent;
    var fontSizeString = document.getElementById(this.props.id).style.fontSize.toString()
    var fontSize = fontSizeString.substring(0, fontSizeString.length-2)
    document.getElementById("fontSize_input").value = fontSize    
    var div = this.props.createResizers()      
    document.getElementById(this.props.id).appendChild(div)
  };
  

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (!this.node.contains(e.target)) {
      var editing = document.getElementById("modifier_area");
      if (!editing.contains(e.target)) {
        // Out of Focus
        this.setState({ hasFocus: false });        
        document.getElementById("text_input").value = ""
        document.getElementById("fontSize_input").value = ""
      }     
      if (this.props.focusedElement !== null){
        var div = this.props.createResizers()   
        document.getElementById(this.props.focusedElement).appendChild(div)
      }   
      
    } 
  };

  render() {
    // x = left , y = top value, width = widht, height = height
    return (
      <div ref={node => (this.node = node)} style = {{transform: "scale(" + this.props.scale + ")"}} >        
        <Rnd
          className={
            this.state.hasFocus
              ? this.props.class
              : this.props.class + "_out_focus"
          }
          default={{
            x: this.props.xCoordinate,
            y: this.props.yCoordinate,
            width: 130,
            height: 30
          }}
          id={this.props.id}          
          onClick={this.setFocus}
          onDrag= {this.updateXAndYCoordinates}
          onResize={this.updateWidthAndHeight}
          disableDragging = {!this.state.hasFocus}
          bounds={".edit_area"}          
          style = {{transform: "scale(" + this.props.scale + ")",  color: this.props.textColor, backgroundColor: this.props.backgroundColor, fontSize: this.props.fontSize}}
  >{this.props.myText}</Rnd>
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "todoLists" }]))(
  NewButton
);
