import { Component } from "react";

import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes } from "../../actions";
import NewStoreModal from "./modals/NewStoreModal";

class SupermarketContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: Array(12)
        .fill("")
        .map((value, index, array) => {
          return `https://picsum.photos/${200}/${200}`;
        }),
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Button className="modal-trigger" href="#newStoreModal" node="button">
            New Store
          </Button>
          <NewStoreModal />
        </Row>
        <Row>
          <Container className="content-area">
            {this.state.cards.map((value) => {
              return (
                <CardItem
                  type={ContentAreaTypes.SUPERMARKETS}
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
  productlist: state.productList,
});

export default connect(mapStateToProps, null)(SupermarketContentArea);
