import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import "materialize-css/dist/css/materialize.min.css";
import TodoListCard from "./TodoListCard";
import DeleteButton from "./DeleteButton";

class TodoListLinks extends React.Component {
  

  render() {
    const todoLists = this.props.todoLists;
    const owner = this.props.profile.firstName + " " + this.props.profile.lastName
    return (
      <div className="row todo-lists section">
        {todoLists &&
          todoLists.filter(element => element.owner === owner).map(WireFrame => (
            <div className = "row" >
              <Link to={"/WireFrame/" + WireFrame.id} key={WireFrame.id}>
                <TodoListCard
                  WireFrame={WireFrame}
                  history={this.props.history}
                />
              </Link>
              <DeleteButton  WireFrame={WireFrame}
                  history={this.props.history}></DeleteButton>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoLists: state.firestore.ordered.todoLists,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(connect(mapStateToProps))(TodoListLinks);
