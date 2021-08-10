import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllProducts,getProductInstance} from "../../actions";
import NewProductModal from "./modals/NewProductModal";
import ProductInstance from "./productInstancesArea";


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
                <div  onClick={async() =>{
                  await this.props.getItem(value._id);
                  this.setState({ isModalOpen: !this.state.isModalOpen });
                }}>
                <CardItem
                  type={ContentAreaTypes.PRODUCTS} //
                  imageUrl={value.imageUrl}
                  hasMenu={true}
                  listItem={value}
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
<<<<<<< HEAD
      <ProductInstance handler={this.handleModal}  item={this.props.item}/>
=======
      <div>
        <Button onClick={()=>
        this.setState({ isModalOpen: !this.state.isModalOpen })
        }>
          close
        </Button>

      </div>
>>>>>>> d18a5da9 (recent changes)
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
  getItem:(id)=> dispatch(getProductInstance(id))
})
export default connect(mapStateToProps,mapDispatchToProp)(ProductContentArea);
