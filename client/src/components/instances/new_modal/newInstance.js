import { Modal } from "react-materialize";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SimpleForm from "./SimpleForm";

class NewInstanceModal extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Modal
                bottomSheet={false}
                fixedFooter={false}
                header="Create a new Inatance"
                id="newInsatanceModal"
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
                    <SimpleForm onNewListSubmit={this.props.newList} id={this.props.id} />
                </div>
            </Modal>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    newList: (vals,id) => dispatch(actions.createProductInstance(vals,id)),
   
    
});

const modalComponent = connect(null, mapDispatchToProps)(NewInstanceModal);

export default reduxForm({
    form: "simpleForm",
})(modalComponent);