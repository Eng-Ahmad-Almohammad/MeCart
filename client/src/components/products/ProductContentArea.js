import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllProducts} from "../../actions";
import NewProductModal from "./modals/NewProductModal";
import ProductInstance from "./instances/productInstancesArea";


class ProductContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards:this.props.storeList,
      ProductIn:{}
    };
  }

  handleModal=()=>{
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }
  componentDidMount(){
    this.props.getData().then(res =>{
    this.setState({ cards: this.props.storeList })
    })
  }


  render() {
    return !this.state.isModalOpen?(
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

              return  (
                <div>
                <CardItem
                  type={ContentAreaTypes.PRODUCTS} 
                  imageUrl={value.imageUrl}
                  hasMenu={true}
                  listItem={value}
                  handler={this.handleModal}
                  title={value.name}
                  itemDescription={value.descriptionOne}
                  // onClick={() =>
                  //   this.setState({ isModalOpen: !this.state.isModalOpen })
                  // }
                />
                </div>
              )
            })}
          </Container>
        </Row>
      </div>
    ):(
      <ProductInstance handler={this.handleModal}  item={this.props.item}/>
    )
  }
}

const mapStateToProps = (state => {
  return {
  storeList: state.product.product,
  item:state.product.item
  }

}
)
const mapDispatchToProp = (dispatch) => ({
  getData :  () =>  dispatch(getAllProducts()),
  
})
export default connect(mapStateToProps,mapDispatchToProp)(ProductContentArea);
