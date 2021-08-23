
import React from 'react';

const SearchBar = ({ onSubmit }) => {
  const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
  function onSubmitSearch(e) {
    e.preventDefault();

    onSubmit(e.target.product.value)
  }
  return (
    <form onSubmit={onSubmitSearch}
      style={{
        width: "90%",
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        margin: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}

    >
      <input
        style={BarStyling}
        key="random1"


        placeholder={"search product"}
        name='product'

      />
      <button type='submit'
        style={{
          width: "200px",
          height: "40px",
          backgroundColor: "#ee6e73",
          color: "white",
          border: "none",
        }}

      >Search</button>
    </form>
  );
}

export default SearchBar
