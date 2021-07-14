import React, { Component } from "react";
import { Icon, Button, Dropdown } from "react-materialize";
import DeleteConfirmModal from "../confirmation/DeleteConfirmModal";
import * as actions from "../../actions";
import { connect } from "react-redux";

class Menu extends Component {
  deleteItem(id) {
    console.log("<<<<<the id is>>>>>: " + id);
    this.props.deleteList(id);
  }

  render() {
    return (
      <Dropdown
        id={this.props.itemId}
        options={{
          alignment: "left",
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          container: null,
          coverTrigger: true,
          hover: false,
          inDuration: 150,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 250,
        }}
        trigger={
          <Button node="button">
            <Icon tiny>more_vert</Icon>
          </Button>
        }
      >
        <a href="#">
          <Icon>edit</Icon>
          Edit
        </a>
        <a
          onClick={() => {
            this.deleteItem(this.props.itemId);
          }}
        >
          <Icon>delete</Icon>
          Delete
        </a>
        <a href="#">
          <Icon>content_copy</Icon>
          Duplicate
        </a>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteList: (id) => dispatch(actions.deleteShoppingList(id)),
});

export default connect(null, mapDispatchToProps)(Menu);
