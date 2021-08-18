import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllProducts,getAllCategories} from "../../actions";

import NewProductModal from "./modals/NewProductModal";
import ProductInstance from "./instances/productInstancesArea";


class ProductContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,

      cards:this.props.storeList,
      ProductIn:{},
      categories:[]
    };
  }


  componentDidUpdate = (prevProps) =>{
    if (prevProps.storeList.length !== this.props.storeList.length){
     console.log(prevProps.storeList , this.props.storeList)
      this.props.getData().then(res =>{
        this.setState({ cards: this.props.storeList })
        })
    }
  }

  handleModal=()=>{
    this.setState({ isModalOpen: !this.state.isModalOpen, ProductIn: this.props.storeList.product })
  }
  componentDidMount = () =>{
    this.props.getData().then(res =>{
    this.setState({ cards: this.props.storeList })
    });
    this.props.getCategories().then(res =>{
      console.log(this.props.category);
      this.setState({categories: this.props.category })
    })
  }


  render() {
    return !this.state.isModalOpen ? (
      <div>
        <Row>
          <Button
            className="modal-trigger"
            href="#newProductModal"
            node="button"
            style={{ marginLeft: "40px" }}
          >
            New Product
          </Button>
          <NewProductModal category={this.state.categories}/>
        </Row>
        <Row
          style={{
            overflow: 'hidden',
          }}
        >
          <Container className="content-area">
            {this.state.cards.map((value) => {

              return (
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
    ) : (
      <ProductInstance handler={this.handleModal} item={this.props.item} />
    )
  }
}

const mapStateToProps = (state => {
  return {
  storeList: state.product.product,
  item:state.product.item,
  category: state.product.category,

  }

}
)
const mapDispatchToProp = (dispatch) => ({
  getData :  () =>  dispatch(getAllProducts()),
  getCategories:()=>dispatch(getAllCategories())

})
export default connect(mapStateToProps, mapDispatchToProp)(ProductContentArea);
