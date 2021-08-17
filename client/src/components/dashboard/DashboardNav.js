import React, { Component } from "react";
import "materialize-css";
import { Icon, SideNav, SideNavItem } from "react-materialize";
import { ContentAreaTypes } from "../../actions";
import NavFooter from "../NavFooter";

class DashboardNav extends Component {
  renderContent() {
    return (
      <SideNav id="SideNav-10" fixed={true}>
        <SideNavItem
          icon={<Icon>dashboard</Icon>}
          onClick={() => {
            this.props.onSelect(ContentAreaTypes.DEFAULT);
          }}
        >
          Dashboard
        </SideNavItem>
        <SideNavItem
          icon={<Icon>shopping_cart</Icon>}
          onClick={() => {
            this.props.onSelect(ContentAreaTypes.SHOPPING);
          }}
        >
          Shopping List
        </SideNavItem>
        <SideNavItem
          icon={<Icon>shopping_basket</Icon>}
          onClick={() => {
            this.props.onSelect(ContentAreaTypes.PRODUCTS);
          }}
        >
          Products
        </SideNavItem>
        <SideNavItem
          icon={<Icon>store</Icon>}
          onClick={() => {
            this.props.onSelect(ContentAreaTypes.SUPERMARKETS);
          }}
        >
          Stores
        </SideNavItem>
        <SideNavItem
          icon={<Icon>leaderboard</Icon>}
          onClick={() => {
            this.props.onSelect(ContentAreaTypes.LEADERBOARD);
          }}
        >
          Leaderboard
        </SideNavItem>

        <NavFooter />
      </SideNav>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default DashboardNav;
