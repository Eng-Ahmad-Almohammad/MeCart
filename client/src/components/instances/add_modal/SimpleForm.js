import React from "react";
import { Field, reduxForm } from "redux-form";


const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit((val) => props.onNewListSubmit(val, props.item._id))}>
      <div>
        <label>quantity</label>
        <div>
          <Field
            name="quantity"
            component="input"
            type="number"
            placeholder="quantity"
          />
        </div>
      </div>
      <div>
        <label>shoppingList</label>
        <div>
          <Field style={{ display: 'inline-block' }} name="shoppingList" component="select">
            {
              props.shoppingList.items.map((list,indx) => {
                return <option value={list._id} key={indx}>{list.name}</option>
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
      </div>
    </form>
  );
};

export default reduxForm({
  form: "simple",
})(SimpleForm);

