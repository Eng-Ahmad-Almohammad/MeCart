import React from "react";
import { Field, reduxForm } from "redux-form";



const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  
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
            <option></option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
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
