import React, { Component } from "react";
import "materialize-css";
import { ToastContainer } from "react-toastify";
import { Icon, Navbar, NavItem } from "react-materialize";
import "react-toastify/dist/ReactToastify.css";
import { ContentAreaTypes, updateContentComponent } from "../actions";
import { connect } from "react-redux";
import NavFooter from "./NavFooter";

class Header extends Component {
  isLoggedIn() {
    return this.props.auth !== null;
  }

  renderSignInNavItems() {
    return (
      <Navbar
        alignLinks="right"
        brand={
          <a className="brand-logo" href="/">
            MeCart
          </a>
        }
        fixed={true}
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <NavItem href={`/`}>Sign In</NavItem>

        <NavFooter />
      </Navbar>
    );
  }

  renderLoggedInNavbar() {
    return (
      <Navbar
        alignLinks="right"
        brand={
          <a className="brand-logo" href="/">
            MeCart
          </a>
        }
        fixed={true}
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <NavItem
          className="hide-on-large-only"
          onClick={() => {
            this.props.updateContentArea(ContentAreaTypes.DEFAULT);
          }}
        >
          <Icon left>dashboard</Icon> Dashboard
        </NavItem>
        <NavItem
          className="hide-on-large-only"
          onClick={() => {
            this.props.updateContentArea(ContentAreaTypes.SHOPPING);
          }}
        >
          <Icon left>shopping_cart</Icon> Shopping List
        </NavItem>
        <NavItem
          className="hide-on-large-only"
          onClick={() => {
            this.props.updateContentArea(ContentAreaTypes.PRODUCTS);
          }}
        >
          <Icon left>shopping_basket</Icon> Products
        </NavItem>
        <NavItem
          className="hide-on-large-only"
          onClick={() => {
            this.props.updateContentArea(ContentAreaTypes.SUPERMARKETS);
          }}
        >
          <Icon left>store</Icon> Supermarkets
        </NavItem>
        <NavItem className="hide-on-large-only" divider />
        <NavItem
          href={`/api/logout?failRedirect=${encodeURIComponent(
            "/"
          )}&successRedirect=${encodeURIComponent("/")}`}
        >
          Logout
        </NavItem>

<<<<<<< HEAD
        <NavItem>Profile</NavItem>
        <NavFooter />
      </Navbar>
    );
  }
=======
                <NavItem
                    onClick={() => {
                        this.props.updateContentArea(ContentAreaTypes.USER_PROFILE);
                    }}
                >Profile</NavItem>
                <NavFooter/>
            </Navbar>
        );
    }
>>>>>>> 52e37470 (project updates)

  render() {
    if (this.isLoggedIn()) {
      return this.renderLoggedInNavbar();
    } else {
      return this.renderSignInNavItems();
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  updateContentArea: (newComponent) =>
    dispatch(updateContentComponent(newComponent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
