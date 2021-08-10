import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllShoppingList ,getShoppingList,fetchUser} from "../../actions";
import NewListModal from "./modals/NewListModal";

class ShoppingContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards:this.props.shoppingList
      // cards: Array(12)
      //   .fill("")
      //   .map((value, index, array) => {}),
    };
  }

  componentDidMount() {

    this.props.fetchShoppingList().then(res =>{
      console.log('from shopping list ======?',this.props.shoppingList)
      this.setState({ cards: this.props.shoppingList });
    })
  }

  render() {
    return !this.state.isModalOpen?(
      <div>
        <Row>
          <Button className="modal-trigger" href="#newListModal" node="button">
            New List
          </Button>
          <NewListModal />
        </Row>
        <Row>
          <Container className="content-area">
            {this.props.shoppingList.items.map((value) => {
              console.log("<<<<<< the value >>>>>>>: " + value._id);
              return (
                <div  onClick={async() =>{
                  await this.props.getItem(value._id);
                  console.log("from click========>",this.props.item);
                  this.setState({ isModalOpen: !this.state.isModalOpen });
                }}>
                <CardItem
                  type={ContentAreaTypes.SHOPPING}
                  hasMenu={true}
                  listItem={value}
                  onClick={() =>
                    this.setState({ isModalOpen: !this.state.isModalOpen })
                  }
                />
                </div>
              );
            })}
          </Container>
        </Row>
      </div>
    ):(
      <div>
        <Button onClick={()=>
        this.setState({ isModalOpen: !this.state.isModalOpen })
        }>
          close
        </Button>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shoppingList: state.shoppingList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchShoppingList:  () => dispatch( getAllShoppingList()),
  getItem:(id)=> dispatch(getShoppingList(id))
  // fetchUser:async ()=>dispatch(await fetchUser())
});

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingContentArea);
