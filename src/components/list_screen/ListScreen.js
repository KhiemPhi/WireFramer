import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import ItemsList from "./ItemsList.js";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Modal} from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link} from "react-router-dom"; //

class ListScreen extends Component {
  state = {
    name: "",
    owner: "",  
    currentEditItem: null,
   
  };
  
  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));

    const fireStore = getFirestore();

    fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .update({
        [target.id]: target.value
      });
  };

  handleDelete = () => {
    const fireStore = getFirestore();
    fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .delete();
    this.props.history.push("/");
  };

  componentWillUnmount = () => {
    const fireStore = getFirestore();
    if (this.props.todoList != null){
      fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .update({
        createdAt: new Date(),
        currentSortingCriteria: this.state.currentSortCriteria
      });

    }
    
  };

  goHome = () => {
    this.props.history.push("/");
  };

  goEdit = () => {
    this.props.history.push("/edit/:id");
  };

 

  render() {
    const auth = this.props.auth;
    const todoList = this.props.todoList;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    if (!todoList) return <React.Fragment />;

    return (
      <div className="container transparent">
        

        <Modal
          header="Delete List?"
          
          trigger={
            <h5 className="transparent" id="list_trash">
              &#128465;
            </h5>
          }
          actions={
            <React.Fragment>
              <Button onClick={this.handleDelete}>Yes</Button>{" "}
              <Button modal="close">No</Button>
            </React.Fragment>
          }
        >
          <section className="dialog_content">
            <p>
              <strong>Are you sure you want to delete this list? </strong>
            </p>
          </section>

          <footer className="dialog_footer">
            The list will not be retreivable.
          </footer>
        </Modal>

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
            defaultValue={todoList.name}
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
            defaultValue={todoList.owner}
          />
        </div>

        <div id="card list_item_container">
          <div id="list_item_header" className="list_item_header_card">
            <div
              className="list_item_task_header"
              onClick={this.sortItemsByTask.bind(this)}
            >
              Task
            </div>

            <div
              className="list_item_due_date_header"
              onClick={this.sortItemsByDueDate.bind(this)}
            >
              Due Date
            </div>

            <div
              className="list_item_status_header"
              onClick={this.sortItemsByStatus.bind(this)}
            >
              Status
            </div>
          </div>
        </div>
        <ItemsList todoList={todoList} history = {this.props.history} currentEditItem = {this.state.currentEditItem} />
            
        <div className="list_item_add_card">
            <Link style={{ color: "black" }}  to={'/edit/' + todoList.id + "/-1"} key={todoList.id} currentEditItem= {this.state.currentEditItem}>&#x2b;</Link>          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) todoList.id = id;
  const currentEditItem = ownProps.currentEditItem
  const currentSortCriteria = ownProps.currentSortCriteria
  return {
    todoList,    
    currentSortCriteria,
    currentEditItem,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ListScreen);
