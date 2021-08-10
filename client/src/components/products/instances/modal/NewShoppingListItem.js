import { Modal } from "react-materialize";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import SimpleForm from "./SimpleForm";

class NewProductModal extends Component {

    constructor(props){
        super(props);
        this.state={

            cards:this.props.shoppingList
        }
    }
    componentDidMount() {

        this.props.fetchShoppingList().then(res =>{
          this.setState({ cards: this.props.shoppingList });
        })
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
                    <SimpleForm onNewListSubmit={this.props.newList}  shoppingList={this.state.cards} item={this.props.item}/>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingList: state.shoppingList,
});

const mapDispatchToProps = (dispatch) => ({
    newList: (vals,id) => dispatch(actions.addProductToShoppingList(vals,id)),
    fetchShoppingList: () => dispatch(actions.getAllShoppingList()),
});

const modalComponent = connect(mapStateToProps, mapDispatchToProps)(NewProductModal);

export default reduxForm({
    form: "simpleForm",
})(modalComponent);