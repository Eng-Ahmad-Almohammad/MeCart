import _ from "lodash";
import { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SignUpField from "./SignUpField";
import formFields from "./formFields";
import './style.css';

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
      <div id="signOptions">
        <form id="mainform">
          {this.renderFields()}
          <button id="signInButton" type="submit" className="teal btn-flat right white-text ">
            Sign Up
            <i className="material-icons right">done</i>
          </button>
        </form>
          <Link to="/dashboard" className="red btn-flat white-text">
            Cancel
          </Link>
      </div>
    );
  }
}

export default reduxForm({
  form: "signUpForm",
  destroyOnUnmount: false,
})(SignUp);
