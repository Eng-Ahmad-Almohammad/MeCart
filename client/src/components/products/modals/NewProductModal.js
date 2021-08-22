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
    console.log('Produccct',this.props.product)
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
          <SimpleForm onNewListSubmit={Object.keys(this.props.product).length !== 0?this.props.updateList:this.props.newList} category={this.props.category} initialValues={this.props.product} />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state => {
  return {
   product: state.product.oneProduct,
  }

})
const mapDispatchToProps = (dispatch) => ({
  newList: (vals) =>  dispatch(actions.createProduct(vals)),
  updateList: (vals) =>  dispatch(actions.replaceProduct(vals)),
});

const modalComponent = connect(mapStateToProps, mapDispatchToProps)(NewProductModal);

export default reduxForm({
  form: "simpleForm",
})(modalComponent);
