import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const Profile = ({ user }) => {
  console.log('useeeeeeeeeer',user)

  return (
    <div>
      <h5>Profile</h5>
     
    </div>
  );
};

function mapStateToProps(state) {
  // console.log('Stattttttte',state);
  return {
    user: state.auth,
  };
}

export default connect(mapStateToProps, actions)(withRouter(Profile));
