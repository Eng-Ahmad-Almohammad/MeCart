import { Modal } from "react-materialize";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SimpleForm from "./SimpleForm";

class NewProductModal extends Component {
  constructor(props){
    super(props);
    this.state={

        category:this.props.category
    }
}
  render() {
    return (
      <Modal
        bottomSheet={false}
        fixedFooter={false}
        header="Create a new list please"
        id="newProductModal"
        open={false}
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
      >
        <div>
          <SimpleForm onNewListSubmit={this.props.newList} category={this.props.category} />
        </div>
      </Modal>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  newList: (vals) =>  dispatch(actions.createProduct(vals)),
  
});

const modalComponent = connect(null, mapDispatchToProps)(NewProductModal);

export default reduxForm({
  form: "simpleForm",
})(modalComponent);
