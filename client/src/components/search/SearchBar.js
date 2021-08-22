
import React from 'react';

const SearchBar = ({onSubmit}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  function onSubmitSearch(e){
    e.preventDefault();
    
    onSubmit(e.target.product.value)
  }
  return (
    <form onSubmit={onSubmitSearch}>
      <input
       style={BarStyling}
       key="random1"
       
       placeholder={"search product"}
       name='product'
       
      />
      <button type='submit'>Search</button>
    </form>
  );
}

export default SearchBar
