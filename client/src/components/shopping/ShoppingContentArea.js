import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllShoppingList ,fetchUser} from "../../actions";
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

<<<<<<< HEAD
  render() {
    return (
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
                <CardItem
                  type={ContentAreaTypes.SHOPPING}
                  hasMenu={true}
                  listItem={value}
                  onClick={() =>
                    this.setState({ isModalOpen: !this.state.isModalOpen })
                  }
                />
              );
            })}
          </Container>
        </Row>
      </div>
    );
  }
=======
    render() {
        console.log({shoppingList: this.props.shoppingList})
        return (
            <div>
                <Row>
                    <Button className="modal-trigger" href="#newListModal" node="button">
                        New List
                    </Button>
                    <NewListModal/>
                </Row>
                <Row>
                    <Container className="content-area">
                        {this.props.shoppingList.items.map((value) => {
                            console.log("<<<<<< the value >>>>>>>: " + value._id);
                            return (
                                <CardItem
                                    key={`shopping-list-${value._id}`}
                                    itemId={value._id}
                                    type={ContentAreaTypes.SHOPPING}
                                    title={value.name}
                                    itemDescription={value.description}
                                    hasMenu={true}
                                    menuItems={this.state.listMenuItems}
                                    onClick={ e => {
                                        this.setState({isModalOpen: !this.state.isModalOpen});
                                        this.props.updateContentArea(ContentAreaTypes.SHOPPING_LIST_DETAILS, value._id)
                                    }
                                    }
                                />
                            );
                        })}
                    </Container>
                </Row>
            </div>
        );
    }
>>>>>>> 52e37470 (project updates)
}

const mapStateToProps = (state) => ({
  shoppingList: state.shoppingList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchShoppingList:  () => dispatch( getAllShoppingList()),
  // fetchUser:async ()=>dispatch(await fetchUser())
});

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingContentArea);
