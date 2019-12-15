import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import ControllerAdder from "./ControllerAdder.js";
import ControllerModifier from "./ControllerModifier.js";
import NewContainer from "./NewContainer.js";
import NewLabel from "./NewLabel.js";
import NewButton from "./NewButton.js";
import NewTextField from "./NewTextField.js";

class EditScreen extends Component {
  state = {
    name: "",
    owner: "",
    containerCounter: 0,
    labelCounter: 0,
    buttonCounter: 0,
    textfieldCounter: 0,
    defaultZoom: 1,
    focusedElement: "edit_area",
    containers: [],
    labels: [],
    buttons: [],
    textfields: [],
    wireFrameWidth: "700px",
    wireFrameHeight: "900px",
    scale: "1",
    loaded: false
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));

    const fireStore = getFirestore();

    fireStore
      .collection("WireFrames")
      .doc(this.props.WireFrame.id)
      .update({
        [target.id]: target.value
      });
  };

  saveWork = () => {
    const fireStore = getFirestore();
    fireStore
      .collection("WireFrames")
      .doc(this.props.WireFrame.id)
      .get()
      .then(doc => {
        let newContainers = this.state.containers.filter( container => container !== undefined)
        let newButtons = this.state.buttons.filter( button => button !== undefined)
        let newLabels = this.state.labels.filter( label => label !== undefined)
        let newTextFields = this.state.textfields.filter(textfield => textfield !== undefined)
        fireStore
          .collection("WireFrames")
          .doc(this.props.WireFrame.id)
          .update({
            containers: newContainers,
            buttons: newButtons,
            labels: newLabels,
            textfields: newTextFields
          });
      });
  };

  goHome = () => {
    this.props.history.push("/");
  };

  addContainer = () => {    
    var counter = this.state.containerCounter;
    counter = counter + 1;
    var id = "new_container" + counter.toString();
    var newContainer = {
      id: id,
      textColor: "#000000",
      backgroundColor: "#ffffff",
      text: "",
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 120,
      height: 80,
      borderRadius: "1px",
      borderColor: "#000000",
      borderThickness: "2px"
    };
    const { containers } = this.state;    
    this.setState({ containers: containers.concat(newContainer) });
    this.setState({ containerCounter: counter });
    this.setState({loaded: true})
  };

  addLabel = () => {
    var counter = this.state.labelCounter;
    counter = counter + 1;
    var id = "new_label" + counter.toString();
    var defaultText = "Prompt For Input";
    var newLabel = {
      id: id,
      textColor: "#000000",
      backgroundColor: "#ffffff",
      text: defaultText,
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 300,
      height: 45,
      borderRadius: "1px",
      borderColor: "#ffffff",
      borderThickness: "0px"
    };
    const { labels } = this.state;
    this.setState({ labels: labels.concat(newLabel) });
    this.setState({ labelCounter: counter });
    this.setState({loaded: true})
  };

  addTextField = () => {
    var counter = this.state.textfieldCounter;
    counter = counter + 1;
    var id = "new_textfield" + counter.toString();
    var defaultText = "INPUT";
    var newTextField = {
      id: id,
      textColor: "#808080",
      backgroundColor: "#ffffff",
      text: defaultText,
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 210,
      height: 30,
      borderRadius: "1px",
      borderColor: "#000000",
      borderThickness: "1px"
    };
    const { textfields } = this.state;
    this.setState({ textfields: textfields.concat(newTextField) });
    this.setState({ textfieldCounter: counter });
    this.setState({loaded: true})
  };

  addButton = () => {
    var counter = this.state.buttonCounter;
    counter = counter + 1;
    var id = "new_button" + counter.toString();
    var defaultText = "SUBMIT";
    var newButton = {
      id: id,
      textColor: "#000000",
      backgroundColor: "#bdbdbd",
      text: defaultText,
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 130,
      height: 30,
      borderRadius: "1px",
      borderColor: "#000000",
      borderThickness: "1px"
    };
    const { buttons } = this.state;
    this.setState({ buttons: buttons.concat(newButton) });
    this.setState({ buttonCounter: counter });
    this.setState({loaded: true})
  };

  

  setFocusedElement = id => {
    this.setState({ focusedElement: id });
  };

  changeWireFrameHeight = value => {
    this.setState({ wireFrameHeight: value });
  };

  changeWireFrameWidth = value => {
    this.setState({ wireFrameWidth: value });
  };

  createResizers = () => {
    var div = document.createElement("div");
    var top_left = document.createElement("div");
    var top_right = document.createElement("div");
    var bottom_left = document.createElement("div");
    var bottom_right = document.createElement("div");
    top_left.className = "resizer top-left";
    top_right.className = "resizer top-right";
    bottom_left.className = "resizer bottom-left";
    bottom_right.className = "resizer bottom-right";
    div.className = "resizers";
    div.appendChild(top_left);
    div.appendChild(top_right);
    div.appendChild(bottom_left);
    div.appendChild(bottom_right);
    return div;
  };

  editText = value => {
    var index = this.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (this.state.focusedElement.includes("label")) {
      newArray = this.state.labels;
      newArray[index].text = value;
      this.setState({ labels: newArray });
    } else if (this.state.focusedElement.includes("button")) {
      newArray = this.state.buttons;
      newArray[index].text = value;
      this.setState({ buttons: newArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newArray = this.state.textfields;
      newArray[index].text = value;
      this.setState({ textfields: newArray });
    }
    this.setState({loaded: true})
  };

  editFontSize = value => {
    var index = this.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (this.state.focusedElement.includes("label")) {
      newArray = this.state.labels;
      newArray[index].fontSize = value.toString() + "px";
      this.setState({ labels: newArray });
    } else if (this.state.focusedElement.includes("button")) {
      newArray = this.state.buttons;
      newArray[index].fontSize = value.toString() + "px";
      this.setState({ buttons: newArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newArray = this.state.textfields;
      newArray[index].fontSize = value.toString() + "px";
      this.setState({ textfields: newArray });
    }
    this.setState({loaded: true})
  };

  handleBorderRadiusChange = value => {    
    var index = this.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (this.state.focusedElement.includes("container")) {
      newArray = this.state.containers;
      newArray[index].borderRadius = value.toString() + "px";
      this.setState({ containers: newArray });
    } else if (this.state.focusedElement.includes("label")) {
      newArray = this.state.labels;
      newArray[index].borderRadius = value.toString() + "px";
      this.setState({ labels: newArray });
    } else if (this.state.focusedElement.includes("button")) {
      newArray = this.state.buttons;
      newArray[index].borderRadius = value.toString() + "px";
      this.setState({ buttons: newArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newArray = this.state.textfields;
      newArray[index].borderRadius = value.toString() + "px";
      this.setState({ textfields: newArray });
    }
    this.setState({loaded: true})
  };

  handleBorderThicknessChange = value => {
    var index = this.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (this.state.focusedElement.includes("container")) {
      newArray = this.state.containers;
      newArray[index].borderThickness = value.toString() + "px";
      this.setState({ containers: newArray });
    } else if (this.state.focusedElement.includes("label")) {
      newArray = this.state.labels;
      newArray[index].borderThickness = value.toString() + "px";
      this.setState({ labels: newArray });
    } else if (this.state.focusedElement.includes("button")) {
      newArray = this.state.buttons;
      newArray[index].borderThickness = value.toString() + "px";
      this.setState({ buttons: newArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newArray = this.state.textfields;
      newArray[index].borderThickness = value.toString() + "px";
      this.setState({ textfields: newArray });
    }
    this.setState({loaded: true})
  };

  handleBorderColorChange = (color, event) => {
    var index = this.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    if (this.state.focusedElement.includes("container")) {
      newArray = this.state.containers;
      newArray[index].borderColor = color.hex;
      this.setState({ containers: newArray });
    } else if (this.state.focusedElement.includes("label")) {
      newArray = this.state.labels;
      newArray[index].borderColor = color.hex;
      this.setState({ labels: newArray });
    } else if (this.state.focusedElement.includes("button")) {
      newArray = this.state.buttons;
      newArray[index].borderColor = color.hex;
      this.setState({ buttons: newArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newArray = this.state.textfields;
      newArray[index].borderColor = color.hex;
      this.setState({ textfields: newArray });
    }
    this.setState({loaded: true})
  };

  handleBackGroundColorChange = (color, event) => {
    if (this.state.focusedElement.includes("container")) {
      var containers = this.state.containers;
      var containerToBeEdit = containers.filter(
        container => container.id === this.state.focusedElement
      )[0];
      containerToBeEdit.backgroundColor = color.hex;
      var indexContainer = Number(containerToBeEdit.id.slice(-1)) - 1;
      containers[indexContainer] = containerToBeEdit;
      this.setState({ containers: containers }); //Confirmed Edit Into Object
    } else if (this.state.focusedElement.includes("label")) {
      var labels = this.state.labels;
      var labelToBeEdit = labels.filter(
        label => label.id === this.state.focusedElement
      )[0];
      labelToBeEdit.backgroundColor = color.hex;
      var indexLabel = Number(labelToBeEdit.id.slice(-1)) - 1;
      labels[indexLabel] = labelToBeEdit;
      this.setState({ labels: labels }); //Confirmed Edit Into Object
    } else if (this.state.focusedElement.includes("button")) {
      var buttons = this.state.buttons;
      var buttonToBeEdit = buttons.filter(
        button => button.id === this.state.focusedElement
      )[0];
      buttonToBeEdit.backgroundColor = color.hex;
      var indexButton = Number(buttonToBeEdit.id.slice(-1)) - 1;
      buttons[indexButton] = buttonToBeEdit;
      this.setState({ buttons: buttons }); //Confirmed Edit Into Object
    } else if (this.state.focusedElement.includes("textfield")) {
      var textfields = this.state.textfields;
      var textfieldToBeEdit = textfields.filter(
        textfield => textfield.id === this.state.focusedElement
      )[0];
      textfieldToBeEdit.backgroundColor = color.hex;
      var indexTextField = Number(textfieldToBeEdit.id.slice(-1)) - 1;
      textfields[indexTextField] = textfieldToBeEdit;
      this.setState({ textfields: textfields }); //Confirmed Edit Into Object
    }
    this.setState({loaded: true})
  };

  handleTextColorChange = (color, event) => {
    if (
      this.state.focusedElement.includes("container") &&
      this.state.containers
    ) {
      var containers = this.state.containers;
      var containerToBeEdit = containers.filter(
        container => container.id === this.state.focusedElement
      )[0];
      containerToBeEdit.textColor = color.hex;
      var indexContainer = Number(containerToBeEdit.id.slice(-1)) - 1;
      containers[indexContainer] = containerToBeEdit;
      this.setState({ containers: containers }); //Confirmed Edit Into Object
    } else if (this.state.focusedElement.includes("label")) {
      var labels = this.state.labels;
      var labelToBeEdit = labels.filter(
        label => label.id === this.state.focusedElement
      )[0];
      labelToBeEdit.textColor = color.hex;
      var indexLabel = Number(labelToBeEdit.id.slice(-1)) - 1;
      labels[indexLabel] = labelToBeEdit;
      this.setState({ labels: labels }); //Confirmed Edit Into Object
    } else if (this.state.focusedElement.includes("button")) {
      var buttons = this.state.buttons;
      var buttonToBeEdit = buttons.filter(
        button => button.id === this.state.focusedElement
      )[0];
      buttonToBeEdit.textColor = color.hex;
      var indexButton = Number(buttonToBeEdit.id.slice(-1)) - 1;
      buttons[indexButton] = buttonToBeEdit;
      this.setState({ buttons: buttons }); //Confirmed Edit Into Object
    } else if (this.state.focusedElement.includes("textfield")) {
      var textfields = this.state.textfields;
      var textfieldToBeEdit = textfields.filter(
        textfield => textfield.id === this.state.focusedElement
      )[0];
      textfieldToBeEdit.textColor = color.hex;
      var indexTextField = Number(textfieldToBeEdit.id.slice(-1)) - 1;
      textfields[indexTextField] = textfieldToBeEdit;
      this.setState({ textfields: textfields }); //Confirmed Edit Into Object
    }
    this.setState({loaded: true})
  };

  updateXAndYCoordinatesFocusedElement = (x, y) => {
    var index = this.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (this.state.focusedElement.includes("container")) {
      newArray = this.state.containers;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      this.setState({ containers: newArray });
    } else if (this.state.focusedElement.includes("label")) {
      newArray = this.state.labels;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      this.setState({ labels: newArray });
    } else if (this.state.focusedElement.includes("button")) {
      newArray = this.state.buttons;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      this.setState({ buttons: newArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newArray = this.state.textfields;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      this.setState({ textfields: newArray });
    }
    this.setState({loaded: true})
  };

  updateWidthAndHeightFocusedElement = (width, height) => {
    var index = this.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (this.state.focusedElement.includes("container")) {
      newArray = this.state.containers;
      newArray[index].width = width;
      newArray[index].height = height;
      this.setState({ containers: newArray });
    } else if (this.state.focusedElement.includes("label")) {
      newArray = this.state.labels;
      newArray[index].width = width;
      newArray[index].height = height;
      this.setState({ labels: newArray });
    } else if (this.state.focusedElement.includes("button")) {
      newArray = this.state.buttons;
      newArray[index].width = width;
      newArray[index].height = height;
      this.setState({ buttons: newArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newArray = this.state.textfields;
      newArray[index].width = width;
      newArray[index].height = height;
      this.setState({ textfields: newArray });
    }
    this.setState({loaded: true})
  };

  zoomIn = () => {
    var zoom = this.state.scale;
    var zoomValue = (Number(zoom) * 2).toString();
    this.setState({ scale: zoomValue });
    this.setState({loaded: true})
  };

  zoomOut = () => {
    var zoom = this.state.scale;
    var zoomValue = (Number(zoom) / 2).toString();
    this.setState({ scale: zoomValue });
    this.setState({loaded: true})
  };

  duplicateElement = id => {
    var index = Number(id.slice(-1)) - 1;
    var counter = 0;
    var newId = "";
    if (id.includes("container")) {
      const { containers } = this.state;
      var containerToBeDuplicate = containers[index];
      counter = this.state.containerCounter;
      counter = counter + 1;
      newId = "new_container" + counter.toString();
      var newContainer = {
        id: newId,
        textColor: containerToBeDuplicate.textColor,
        backgroundColor: containerToBeDuplicate.backgroundColor,
        text: containerToBeDuplicate.text,
        fontSize: containerToBeDuplicate.fontSize,
        xCoordinate: containerToBeDuplicate.xCoordinate + 100,
        yCoordinate: containerToBeDuplicate.yCoordinate + 100,
        width: containerToBeDuplicate.width,
        height: containerToBeDuplicate.height,
        borderRadius: containerToBeDuplicate.borderRadius
      };
      this.setState({ containers: containers.concat(newContainer) });
      this.setState({ containerCounter: counter });
    } else if (id.includes("label")) {
      const { labels } = this.state;
      var labelToBeDuplicate = labels[index];
      counter = this.state.labelCounter;
      counter = counter + 1;
      newId = "new_label" + counter.toString();
      var newLabel = {
        id: newId,
        textColor: labelToBeDuplicate.textColor,
        backgroundColor: labelToBeDuplicate.backgroundColor,
        text: labelToBeDuplicate.text,
        fontSize: labelToBeDuplicate.fontSize,
        xCoordinate: labelToBeDuplicate.xCoordinate + 100,
        yCoordinate: labelToBeDuplicate.yCoordinate + 100,
        width: labelToBeDuplicate.width,
        height: labelToBeDuplicate.height,
        borderRadius: labelToBeDuplicate.borderRadius
      };
      this.setState({ labels: labels.concat(newLabel) });
      this.setState({ labelCounter: counter });
    } else if (id.includes("button")) {
      const { buttons } = this.state;
      var buttonToBeDuplicate = buttons[index];
      counter = this.state.buttonCounter;
      counter = counter + 1;
      newId = "new_button" + counter.toString();
      var newButton = {
        id: newId,
        textColor: buttonToBeDuplicate.textColor,
        backgroundColor: buttonToBeDuplicate.backgroundColor,
        text: buttonToBeDuplicate.text,
        fontSize: buttonToBeDuplicate.fontSize,
        xCoordinate: buttonToBeDuplicate.xCoordinate + 100,
        yCoordinate: buttonToBeDuplicate.yCoordinate + 100,
        width: buttonToBeDuplicate.width,
        height: buttonToBeDuplicate.height,
        borderRadius: buttonToBeDuplicate.borderRadius
      };
      this.setState({ buttons: buttons.concat(newButton) });
      this.setState({ buttonCounter: counter });
    } else if (id.includes("textfield")) {
      const { textfields } = this.state;
      var textfieldToBeDuplicate = textfields[index];
      counter = this.state.textfieldCounter;
      counter = counter + 1;
      newId = "new_textfield" + counter.toString();
      var newTextField = {
        id: newId,
        textColor: textfieldToBeDuplicate.textColor,
        backgroundColor: textfieldToBeDuplicate.backgroundColor,
        text: textfieldToBeDuplicate.text,
        fontSize: textfieldToBeDuplicate.fontSize,
        xCoordinate: textfieldToBeDuplicate.xCoordinate + 100,
        yCoordinate: textfieldToBeDuplicate.yCoordinate + 100,
        width: textfieldToBeDuplicate.width,
        height: textfieldToBeDuplicate.height,
        borderRadius: textfieldToBeDuplicate.borderRadius
      };
      this.setState({ textfields: textfields.concat(newTextField) });
      this.setState({ textfieldCounter: counter });
    }
    this.setState({loaded: true})
  };

  deleteAndCopyDetect = event => {
    if (event.key === "d" && event.ctrlKey) {
      event.preventDefault();
      if (this.state.focusedElement !== null) {
        var elementToDuplicate = this.state.focusedElement;
        this.duplicateElement(elementToDuplicate);
      }
    } else if (event.key === "Delete") {
      if (this.state.focusedElement !== null) {
        var indexToBeDelete = Number(this.state.focusedElement.slice(-1) - 1);
        if (this.state.focusedElement.includes("container")) {
          const { containers } = this.state;
          var tempContainer = containers;
          delete tempContainer[indexToBeDelete];
          this.setState({ containers: tempContainer });
          this.setState({ focusedElement: null });
        } else if (this.state.focusedElement.includes("label")) {
          const { labels } = this.state;
          var tempLabels = labels;
          delete tempLabels[indexToBeDelete];
          this.setState({ labels: tempLabels });
          this.setState({ focusedElement: null });
        } else if (this.state.focusedElement.includes("button")) {
          const { buttons } = this.state;
          var tempButtons = buttons;
          delete tempButtons[indexToBeDelete];
          this.setState({ buttons: tempButtons });
          this.setState({ focusedElement: null });
        } else if (this.state.focusedElement.includes("textfield")) {
          const { textfields } = this.state;
          var tempTextFields = textfields;
          delete tempTextFields[indexToBeDelete];
          this.setState({ textfields: tempTextFields });
          this.setState({ focusedElement: null });
        }
      }
    }
    this.setState({loaded: true})
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.deleteAndCopyDetect, false);
  };

  componentWillUnmount = () => {
    const fireStore = getFirestore();
    if (this.props.todoList != null) {
      fireStore
        .collection("WireFrames")
        .doc(this.props.todoList.id)
        .update({
          createdAt: new Date()
        });
    }
    document.removeEventListener("keydown", this.unDoAndRedoDetect, false);
  };

  static getDerivedStateFromProps(nextProps, prevState) {      
      if (prevState.loaded === false){        
        return {
          buttons: nextProps.buttons,
          containers: nextProps.containers,
          labels: nextProps.labels,
          textfields: nextProps.textfields,
          containerCounter: nextProps.containerCounter,
          labelCounter: nextProps.labelCounter,
          textfieldCounter: nextProps.textfieldCounter,
          buttonCounter: nextProps.buttonCounter,          
        };
      }else{
        return null
      }   
     
  }

  render() {
    const auth = this.props.auth;
    const WireFrame = this.props.WireFrame;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    if (!WireFrame) return <React.Fragment />;

    return (
      <div>
        <div className="input-field">
          <label htmlFor="email" className="active">
            Name
          </label>
          <input
            className="active"
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
            defaultValue={WireFrame.name}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password" className="active">
            Owner
          </label>
          <input
            className="active"
            type="text"
            name="owner"
            id="owner"
            onChange={this.handleChange}
            defaultValue={WireFrame.owner}
          />
        </div>
        <div className="row" style={{ display: "flex" }}>
          <ControllerAdder
            goHome={this.goHome.bind(this)}
            zoomIn={this.zoomIn.bind(this)}
            zoomOut={this.zoomOut.bind(this)}
            addContainer={this.addContainer.bind(this)}
            addLabel={this.addLabel.bind(this)}
            addButton={this.addButton.bind(this)}
            addTextField={this.addTextField.bind(this)}
            changeWireFrameHeight={this.changeWireFrameHeight.bind(this)}
            changeWireFrameWidth={this.changeWireFrameWidth.bind(this)}
            wireFrameWidth={Number(
              this.state.wireFrameWidth.substring(
                0,
                this.state.wireFrameWidth.length - 2
              )
            )}
            scale={this.state.scale}
            saveWork={this.saveWork.bind(this)}
          />

          <div
            className="edit_area white control_container_only_top_and_bottom col s8 l4"
            id="edit_area"
            style={{
              zIndex: "1",
              width: this.state.wireFrameWidth,
              height: this.state.wireFrameHeight,
              zoom: "200%",
              transform: "scale(" + this.state.scale + ")",
              transformOrigin: "0 0",
              maxWidth: "5000px",
              maxHeight: "5000px",
              overflow : "scroll"
            }}
            
          >
            {this.state.containers.map(x => (
              <NewContainer
                class={"new_container"}
                id={x.id}
                containerCounter={this.state.containerCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}                
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.labels.map(x => (
              <NewLabel
                class={"new_label"}
                id={x.id}
                labelCounter={this.state.labelCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}
                myText={x.text}
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.buttons.map(x => (
              <NewButton
                class={"new_button"}
                id={x.id}
                buttonCounter={this.state.buttonCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}
                myText={x.text}
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.textfields.map(x => (
              <NewTextField
                class={"new_textfield"}
                id={x.id}
                textfieldCounter={this.state.textfieldCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}
                myText={x.text}
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}
          </div>
          <ControllerModifier
            editText={this.editText.bind(this)}
            editFontSize={this.editFontSize.bind(this)}
            focusedElement={this.state.focusedElement}
            focusedElementText={this.state.focusedElementText}
            wireFrameWidth={Number(
              this.state.wireFrameWidth.substring(
                0,
                this.state.wireFrameWidth.length - 2
              )
            )}
            handleBackGroundColorChange={this.handleBackGroundColorChange.bind(
              this
            )}
            handleTextColorChange={this.handleTextColorChange.bind(this)}
            handleBorderRadiusChange={this.handleBorderRadiusChange.bind(this)}
            handleBorderThicknessChange={this.handleBorderThicknessChange.bind(
              this
            )}
            handleBorderColorChange={this.handleBorderColorChange.bind(this)}
            scale={this.state.scale}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { WireFrames } = state.firestore.data;
  const WireFrame = WireFrames ? WireFrames[id] : null;

  if (WireFrame) WireFrame.id = id;
  if (WireFrame) {
    var containers = WireFrame.containers;
    var buttons = WireFrame.buttons;
    var labels = WireFrame.labels;
    var textfields = WireFrame.textfields;
    var containerCounter = WireFrame.containers.length
    var buttonCounter = WireFrame.buttons.length
    var labelCounter = WireFrame.labels.length
    var textfieldCounter = WireFrame.textfields.length
    
  }

  return {
    WireFrame, 
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    containers,
    buttons,
    labels,
    textfields,
    containerCounter,
    buttonCounter,
    labelCounter,
    textfieldCounter,    
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "WireFrames" }])
)(EditScreen);
