import React, { Component } from "react";
// import { chain, random } from "lodash";
import { Button, Container, Row, Col, CardTitle, Card, Icon } from "react-materialize";
import CardItem from "./card/index";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllShoppingList, deleteInstanceFromList, getShoppingList } from "../../actions";
import NewListModal from "./modals/NewListModal";

class ShoppingContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: this.props.shoppingList,
      shoppingList: {},

      // cards: Array(12)
      //   .fill("")
      //   .map((value, index, array) => {}),
    };
  }

  componentDidMount = () => {

    this.props.fetchShoppingList().then(res => {
      this.setState({ cards: this.props.shoppingList });
    })
  }


 

  componentDidUpdate = (prevProps) => {
    if (prevProps.shoppingList.length !== this.props.shoppingList.length) {
     

      this.props.fetchShoppingList().then(res => {
        this.setState({ cards: this.props.shoppingList })
      })
    }
 
  }



  delete = (id, listId) => {

    this.props.delete(id, listId);
  }


  handlerShopingList = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen, shoppingList: this.props.shoppingList.shoppingList });
  }


  render() {
    
    return !this.state.isModalOpen ? (
      <div>
        <Row>
          <Button className="modal-trigger" href="#newListModal" node="button" style={{ marginLeft: "40px" }}>
            New List
          </Button>
          <NewListModal />
        </Row>
        <Row>
          <Container className="content-area">
            {this.props.shoppingList.items.map((value) => {
              
              return (
                <div>
                  {/* <CardItem
                    type={ContentAreaTypes.SHOPPING}
                    hasMenu={true}
                    listItem={value}
                    handler={this.handlerShopingList}
                    imageUrl={`https://picsum.photos/${random(200, 300)}/${random(
                      250,
                      350
                    )}`}
                    onClick={() =>
                      this.setState({ isModalOpen: !this.state.isModalOpen })
                    }
                  /> */}
                  <CardItem
                    type={ContentAreaTypes.SHOPPING}
                    hasMenu={true}
                    listItem={value}
                    handler={this.handlerShopingList}
                    header={value.imageUrl}
                    title={value.name || ""}
                    itemDescription={value.description}
                    itemsNu={value.products.length}
                    className="hoverable"
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
    ) : (
      <div>
        <Row>
          <Button onClick={() =>
            this.setState({ isModalOpen: !this.state.isModalOpen })
          }>
            close
          </Button>
        </Row>
        <Row>
          <Container>
            <div>

              <Row>
                <Container className="content-area">
                  {
                    this.props.shoppingList.shoppingList.productInstances.map((item, indx) => {

                      return (
                        <Row>
                          <Col
                            m={12}
                            s={12}
                          >
                            <Card
                              closeIcon={<Icon>close</Icon>}
                              header={<CardTitle image="https://materializecss.com/images/sample-1.jpg" reveal waves="light" />}
                              reveal={
                                <>
                                  <p>priceBeforeTax {item.priceBeforeTax}</p>
                                  <p>priceAfterTax {item.priceAfterTax}</p>
                                  <p>unitOfMeasure {item.unitOfMeasure}</p>
                                  <p>measurement {item.measurement}</p>
                                  <p>quantity {this.state.shoppingList.shoppingProducts[indx].quantity}</p>

                                  <Button

                                    onClick={() => this.delete(item._id, this.state.shoppingList.shoppingList._id)}
                                    style={{
                                      display: "inline-block",
                                      textAlign: "center",
                                      fontSize: "10px"
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </>
                              }
                              revealIcon={<Icon>more_vert</Icon>}
                              title="Card Title"
                            >
                              <p>

                              </p>
                            </Card>
                          </Col>
                        </Row>
                      )
                    })
                  }
                </Container>
              </Row>

            </div>
          </Container>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shoppingList: state.shoppingList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchShoppingList: () => dispatch(getAllShoppingList()),
  delete: (id, listId) => dispatch(deleteInstanceFromList(id, listId)),
  getItems: (id) => dispatch(getShoppingList(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingContentArea);
