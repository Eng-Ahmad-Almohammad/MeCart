import _ from "lodash";
import { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link, Redirect } from "react-router-dom";
import SignInField from "./SignInField";
import formFields from "./formFields";
import { connect } from "react-redux";
import './style.css';

class SignIn extends Component {
  isLoggedIn() {
    return this.props.auth !== null;
  }

  updateField = (event, newValue, previousValue, name) => {
    var newState = {};
    newState[name] = newValue;
    console.log({ newValue, previousValue, name });
    this.setState(newState);
  };

  getFieldValue(name) {
    return this.state[name];
  }

  renderFields() {
    return _.map(formFields, (field) => {
      return (
        <Field
          key={field.name}
          component={SignInField}
          type="text"
          label={field.label}
          name={field.name}
          initial={field.defaultValue}
          onChange={(event, newValue, previousValue, name) =>
            this.updateField(event, newValue, previousValue, name)
          }
        />
      );
    });
  }

  render() {
    if (this.isLoggedIn()) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <div id="signOptions">
          <form id="mainform">
            {this.renderFields()}
            <button
              id="signInButton"
              type="submit"
              className="teal btn-flat right white-text"
              // onClick={() => signIn(formValues, history)}
            >
              Sign In
              <i className="material-icons right">done</i>
            </button>
          </form>

          <a
            className="red btn-flat white-text"
            href={`/auth/google?failRedirect=${encodeURIComponent(
              "/"
            )}&successRedirect=${encodeURIComponent("/dashboard")}`}
          >
            Login with Google
          </a>
          <Link to="/sign-up" className="red btn-flat white-text">
            Sign Up
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

SignIn = connect(mapStateToProps, null)(SignIn);

export default reduxForm({
  form: "SignInForm",
  destroyOnUnmount: false,
})(SignIn);
