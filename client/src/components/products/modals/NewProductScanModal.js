import {Modal} from "react-materialize";
import React, {Component} from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import Scanner from "../../scanner/Scanner";

class NewProductScanModal extends Component {
    render() {
        return (
            <Modal
                bottomSheet={false}
                fixedFooter={false}
                header="Scan Item"
                id="newProductScanModal"
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
                    <Scanner/>
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    newProduct: (vals) => dispatch(actions.createProduct(vals)),
});

const modalComponent = connect(null, mapDispatchToProps)(NewProductScanModal);

export default reduxForm({
    form: "simpleForm",
})(modalComponent);
