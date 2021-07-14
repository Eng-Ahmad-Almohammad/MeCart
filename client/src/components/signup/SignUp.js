import _ from "lodash";
import { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SignUpField from "./SignUpField";
import formFields from "./formFields";

class SignUp extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SignUpField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form>
          {this.renderFields()}
          <Link to="/dashboard" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text ">
            Sign In
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "signUpForm",
  destroyOnUnmount: false,
})(SignUp);
