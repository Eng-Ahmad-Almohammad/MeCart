import React, { Component } from "react";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllProducts,getProductInstance} from "../../actions";
import NewProductModal from "./modals/NewProductModal";


class ProductContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards:this.props.storeList,
      ProductIn:{}
    };
  }
  componentDidMount(){
    this.props.getData().then(res =>{
    this.setState({ cards: this.props.storeList })
    })
  }

  // componentDidUpdate(prevState){
  //   if(this.state.isModalOpen===true&&prevState.isModalOpen==false){
  //    const GetItem=()=>{

  //    }
  //   }
  // }
  
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
                  console.log("from click========>",this.props.item);
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
      <div>
        <Button onClick={()=>
        this.setState({ isModalOpen: !this.state.isModalOpen })
        }>
          close
        </Button>
        <p>priceBeforeTax {this.props.item.priceBeforeTax}</p>
        <p>priceAfterTax {this.props.item.priceAfterTax}</p>
        <p>unitOfMeasure {this.props.item.unitOfMeasure}</p>
        <p>measurement {this.props.item.measurement}</p>
      </div>
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
