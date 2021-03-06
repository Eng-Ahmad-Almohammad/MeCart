import { connect } from "react-redux";
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import * as actions from '../../actions'


const SearchPage = (props) => {


  const updateInput = async (input) => {
    await props.getData(input, props.dashboard)

  }

  console.log(props.products);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        margin: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{props.dashboard} List</h1>
      <SearchBar

        onSubmit={updateInput}
      />
      {props.products ? <SearchList products={props.products} /> : <h1>You can search now</h1>}

    </div>
  );
}

const mapStateToProps = (state) => {

  return {
    products: state.search.results,

    dashboard: state.dashboard.oldComponent,

  };
}
const mapDispatchToProp = (dispatch) => ({
  getData: (search, type) => dispatch(actions.showSearch(search, type)),

})
export default connect(mapStateToProps, mapDispatchToProp)(SearchPage);
