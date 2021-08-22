import { Modal } from "react-materialize";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SimpleForm from "./SimpleForm";


class NewStoreModal extends Component {
  // resetMood(event) {
  //   event.preventDefault();
  //   this.props.reset('simple');
  // }
  
  render() {

    return (
      <Modal
        bottomSheet={false}
        fixedFooter={false}
        header="Create a new list please"
        id="newStoreModal"
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
          <SimpleForm onNewListSubmit={Object.keys(this.props.store).length !== 0?this.props.updateList:this.props.newList} initialValues={this.props.store} />
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state => {
  return {
   store: state.stores.oneStore,
  }

})
const mapDispatchToProps = (dispatch) => ({
  newList: (vals) => dispatch(actions.createSupermarket(vals)),
  updateList: (vals) => dispatch(actions.replaceSupermarket(vals)),
});

const modalComponent = connect(mapStateToProps, mapDispatchToProps)(NewStoreModal);

export default reduxForm({
  form: "simpleForm",
})(modalComponent);
