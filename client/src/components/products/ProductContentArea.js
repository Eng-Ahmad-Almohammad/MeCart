import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes } from "../../actions";
import NewProductModal from "./modals/NewProductModal";

class ProductContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: Array(12)
        .fill("")
        .map((value, index, array) => {
          return `https://picsum.photos/${250}/${250}`;
        }),
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Button
            className="modal-trigger"
            href="#newProductModal"
            node="button"
          >
            New Product
          </Button>
          <NewProductModal />
        </Row>
        <Row>
          <Container className="content-area">
            {this.state.cards.map((value) => {
              return (
                <CardItem
                  type={ContentAreaTypes.PRODUCTS} //
                  imageUrl={value.imageUrl}
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
  storeList: state.storeList,
});

export default connect(mapStateToProps, null)(ProductContentArea);
