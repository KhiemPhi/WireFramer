import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { TextInput} from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { ChromePicker } from 'react-color';
import ColorPickerBackground from "./ColorPickerBackground";
import ColorPickerText from "./ColorPickerText"
import ColorPickerBorder from "./ColorPickerBorder"

class ControllerModifier extends Component {  
  state = {
    showColorPickerBackgroundColor: true,
    showColorPickerBorderColor: true,
    showColorPickerTextColor: true
  }

  toggleBackGroundColorDiv = () => {    
    const {showColorPickerBackgroundColor} = this.state
    this.setState({showColorPickerBackgroundColor : !showColorPickerBackgroundColor})
  }
  
  toggleTextColorDiv = () => {    
    const {showColorPickerTextColor} = this.state
    this.setState({showColorPickerTextColor : !showColorPickerTextColor})
  }

  toggleBorderColorDiv = () => {
    const {showColorPickerBorderColor} = this.state
    this.setState({showColorPickerBorderColor : !showColorPickerBorderColor})
  }

  render() {   
    return (            
        <div className= {this.props.wireFrameWidth > 1000 ? this.props.wireFrameWidth >= 3000 ? "control_container col s12 l4" : "control_container col s5" : "control_container col s3"} id = "modifier_area"  style = {{ transformOrigin: "0 0"}}>
            <div style ={{paddingTop: "15%", marginLeft: "20%"}} > Properties </div>
              
              <TextInput id = "text_input" onChange = {e => this.props.editText(e.target.value)}   />                     
              
              <div className = "row" style ={{paddingTop: "5%"}}>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Font Size:</div>
                <div className = "col s4">
                  <TextInput id = "fontSize_input" onChange = {e => this.props.editFontSize(e.target.value)} ></TextInput>
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Background:</div>
                <div className = "col s1">
                  {this.state.showColorPickerBackgroundColor && <div className = "background_color" id = "background_color_input" onClick= {this.toggleBackGroundColorDiv} style={this.props.focusedElement !== null ? {backgroundColor: document.getElementById(this.props.focusedElement).style.backgroundColor} : {backgroundColor: "#000000"}} ></div>}
                  {!this.state.showColorPickerBackgroundColor && <ColorPickerBackground focusedElement = {this.props.focusedElement} toggleBackGroundColorDiv = {this.toggleBackGroundColorDiv.bind(this)} handleBackGroundColorChange = {this.props.handleBackGroundColorChange} ></ColorPickerBackground>}
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Text Color:</div>
                <div className = "col s1">
                  {this.state.showColorPickerTextColor && <div className = "text_color" id = "text_color_input" onClick= {this.toggleTextColorDiv} style={this.props.focusedElement !== null ? {backgroundColor: document.getElementById(this.props.focusedElement).style.color} : {backgroundColor: "#000000"}} ></div>}
                  {!this.state.showColorPickerTextColor && <ColorPickerText focusedElement = {this.props.focusedElement} toggleTextColorDiv = {this.toggleTextColorDiv.bind(this)} handleTextColorChange = {this.props.handleTextColorChange}></ColorPickerText>}
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px" }}>Border Color:</div>
                <div className = "col s1">
                  <div className = "border_color" id = "border_color_input" ></div>
                </div>
                <div className = "col s9" style={{marginTop: "25px", fontSize: "12px"}}>Border Thickness:</div>
                <div className = "col s3 ">
                  <input id = "border_thickness_input"></input>
                </div>
                <div className = "col s9" style={{marginTop: "25px", fontSize: "12px", paddingBottom: "100%"}}>Border Radius:</div>
                <div className = "col s3 ">
                  <input id = "border_radius_input"></input>
                </div>                
             </div>   
          </div>
      
    );
  }
}

export default compose(  
  firestoreConnect([{ collection: "todoLists" }])
)(ControllerModifier);
