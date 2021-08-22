import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {Button} from "react-materialize";
import NewProductScanModal from "./NewProductScanModal";




const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  console.log("from simmmpllle fooorrrrmmmmm=====>",props.product)
  return (
    <form onSubmit={handleSubmit((val) => props.onNewListSubmit(val))}>
      <div>
        <label>Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="List Name"
            value={props.product.name}
          />
        </div>
      </div>
      <div>
        <label>Description One</label>
        <div>
          <Field
            name="descriptionOne"
            component="input"
            type="text"
            placeholder="Description One"
          />
        </div>
      </div>
      <div>
        <label>Description Two</label>
        <div>
          <Field
            name="descriptionTwo"
            component="input"
            type="text"
            placeholder="Description Two"
          />
        </div>
      </div>
      <div>
        <label>Category</label>
        <div>
          <Field style={{display: 'inline-block'}} name="category" component="select">
            {
              props.category.map((item,indx)=>{
                return <option value={item._id} key={indx}>{item.name}</option>
              })
            }
          </Field>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        <Button
                    className="modal-trigger"
                    href="#newProductScanModal"
                    node="button"
                >
                    Scan
                </Button>
                <NewProductScanModal/>
      </div>
    </form>
  );
};

const mapStateToProps = (state => {
  return {
   product: state.product.oneProduct,
  }

})

export default connect(mapStateToProps, null)( reduxForm({
  form: "simple",
  enableReinitialize: true
})(SimpleForm));
