import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllProducts } from "../../actions";
import NewProductModal from "./modals/NewProductModal";


class ProductContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards:this.props.storeList
      // cards: Array(12)
      //   .fill("")
      //   .map((value, index, array) => {
      //     return `https://picsum.photos/${250}/${250}`;
      //   }),
    };
  }
  componentDidMount(){
    this.props.getData().then(res =>{
      console.log('Hellllllllllllo',this.props.storeList)
    this.setState({ cards: this.props.storeList })
    })
    
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards !== this.state.cards) {
      console.log('Carrrrrrrddds',this.state.cards)
    }
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

const mapStateToProps = (state => {
  console.log('Stattttttttttttttttttttte',state);
  return {
  storeList: state.product.product
  }

}
)
const mapDispatchToProp = (dispatch) => ({
  getData :  () =>  dispatch(getAllProducts())
})
export default connect(mapStateToProps,mapDispatchToProp)(ProductContentArea);
