import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Dashboard from "./dashboard/Dashboard";
import Landing from "./Landing";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import { Container } from "react-materialize";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Container id="mecart-container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={SignIn} />
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default connect(null, actions)(App);
