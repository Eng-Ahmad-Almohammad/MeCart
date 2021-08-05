import React, { Component } from "react";

import DashboardNav from "./DashboardNav";
import ProductContentArea from "../products/ProductContentArea";
import ShoppingContentArea from "../shopping/ShoppingContentArea";
import Profile from "../profile/Profile";
import SupermarketContentArea from "../supermarkets/SupermarketContentArea";
import DashboardContentArea from "./DashboardContentArea";

import "./style.scss";
import { Col, Container, Row } from "react-materialize";
import { ContentAreaTypes, updateContentComponent } from "../../actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Redirect } from "react-router";

class Dashboard extends Component {

  isLoggedIn() {
    return this.props.auth !== null;
  }
  componentDidUpdate() {
    if (this.props.dashboard.isFailed) {
      toast.error("Sorry, cannot find that screen. 😟");
      this.props.updateContentArea(ContentAreaTypes.DEFAULT);
    }
  }

  renderContent() {
    switch (this.props.dashboard.component) {
      case ContentAreaTypes.PRODUCTS:
        return <ProductContentArea />;
      case ContentAreaTypes.SHOPPING:
        return <ShoppingContentArea />;
      case ContentAreaTypes.SUPERMARKETS:
        return <SupermarketContentArea />;
      case ContentAreaTypes.DEFAULT:
      default:
        return <DashboardContentArea />;
    }
  }

  render() {
    if (!this.isLoggedIn())
    {
      return <Redirect to="/"/>
    }
    const { menuMinimized } = this.props.dashboard;
    return (
      <Row id="dashboard">
        {!menuMinimized && (
          <Col s={0} l={2}>
            <DashboardNav onSelect={this.props.updateContentArea} />
          </Col>
        )}
        <Col s={12} l={10}>
          <Container id="dashboard-container">{this.renderContent()}</Container>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  dashboard: state.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  updateContentArea: (newComponent) =>
    dispatch(updateContentComponent(newComponent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
