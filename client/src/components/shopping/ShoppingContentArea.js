import React, { Component } from "react";
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

  componentDidMount() {

    this.props.fetchShoppingList().then(res =>{
      console.log('from shopping list ======?',this.props.shoppingList)
      this.setState({ cards: this.props.shoppingList });
    })
  }

  render() {
    return !this.state.isModalOpen?(
      <div>
        <Row>
          <Button className="modal-trigger" href="#newListModal" node="button" style={{marginLeft: "40px"}}>
            New List
          </Button>
          <NewListModal />
        </Row>
        <Row>
          <Container className="content-area">
            {this.props.shoppingList.items.map((value) => {
              return (
                <div  onClick={async() =>{
                  await this.props.getItem(value._id);
                  this.setState({ isModalOpen: !this.state.isModalOpen,shoppingList:this.props.shoppingList.shoppingList });
                  console.log('from click====',this.state.shoppingList)
                }}>
                <CardItem
                  type={ContentAreaTypes.SHOPPING}
                  hasMenu={true}
                  listItem={value}
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
  getItem:(id)=> dispatch(getShoppingList(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingContentArea);
