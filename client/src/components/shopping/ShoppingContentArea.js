import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllShoppingList } from "../../actions";
import NewListModal from "./modals/NewListModal";

class ShoppingContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: Array(12)
        .fill("")
        .map((value, index, array) => {}),
    };
  }

  async componentDidMount() {
    await this.props.fetchShoppingList();
  }

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
}

const mapStateToProps = (state) => ({
  shoppingList: state.shoppingList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchShoppingList: async () => dispatch(await getAllShoppingList()),
});

export default connect(mapStateToProps, null)(ShoppingContentArea);
