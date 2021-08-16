import React, { Component } from "react";
import { random } from "lodash";
import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllShoppingList ,getShoppingList} from "../../actions";
import NewListModal from "./modals/NewListModal";

class ShoppingContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards:this.props.shoppingList,
      shoppingList:{}
      // cards: Array(12)
      //   .fill("")
      //   .map((value, index, array) => {}),
    };
  }

  componentDidMount = ()=>{

    this.props.fetchShoppingList().then(res =>{
      console.log('from shopping list ======?',this.props.shoppingList)
      this.setState({ cards: this.props.shoppingList });
    })
  }
 
  
  handlerShopingList = () =>{
    this.setState({ isModalOpen: !this.state.isModalOpen,shoppingList:this.props.shoppingList.shoppingList });
  }


  render() {
    
    return !this.state.isModalOpen?(
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
              return (
                <div>
                <CardItem
                  type={ContentAreaTypes.SHOPPING}
                  hasMenu={true}
                  listItem={value}
                  handler = {this.handlerShopingList}
                  imageUrl={`https://picsum.photos/${random(200, 300)}/${random(
                    250,
                    350
                  )}`}
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
    ):(
      <div>
        <Row>
        <Button onClick={()=>
        this.setState({ isModalOpen: !this.state.isModalOpen })
        }>
          close
        </Button>
        </Row>
        <Row>
          <Container>
            <div>
              <p>list name {this.state.shoppingList.shoppingList.name}</p>
              <p>list description {this.state.shoppingList.shoppingList.description}</p>
              {
                this.state.shoppingList.productInstances.map((item,indx)=>{
                  return <p key={indx}>prodct number {indx+1} price before taxes{item.priceBeforeTax}</p>
                })
              }
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
  fetchShoppingList:  () => dispatch( getAllShoppingList()),
 
});

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingContentArea);
