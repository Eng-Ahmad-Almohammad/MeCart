import React from 'react';
import { Footer } from 'react-materialize';

const NavFooter = () => (
  <Footer 
    copyrights="&copy 2021 Copyright Text"
    style={{
      position: "fixed",
      bottom: "65px",
      width: "100%",
      height: "fit-content"
    }}
  >
    <h5 className="white-text">
      Footer Content
    </h5>
  </Footer>);

export default NavFooter;