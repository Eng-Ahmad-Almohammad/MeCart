import React, { Component } from "react";
import { Icon, Button, Dropdown } from "react-materialize";
import DeleteConfirmModal from "../confirmation/DeleteConfirmModal";
import * as actions from "../../actions";
import { connect } from "react-redux";

class Menu extends Component {

  constructor(props){
    super(props)
    this.setState({type: this.props.itemType , 
                    itemId: this.props.itemId,
    })
  }

  deleteItem(id) {
    console.log("<<<<<the id is>>>>>: " + id);
    this.props.deleteList(id);
  }

  render() {
    return (
      <Dropdown
        id={this.props.itemId}
        options={{
          alignment: "left",
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          container: null,
          coverTrigger: true,
          hover: false,
          inDuration: 150,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 250,
        }}
        trigger={
          <Button node="button">
            <Icon tiny>more_vert</Icon>
          </Button>
        }
        
      >
         <a
         onClick={async() =>{
           if (this.props.itemType === 'Products'){
          await this.props.getItem(this.props.itemId);
         this.props.handler();
           }
           else if (this.props.itemType === 'Shopping'){
            await this.props.getShopItem(this.props.itemId);
            this.props.handler();
           }
           else if (this.props.itemType === 'Supermarkets') {
            await this.props.getStoreItem(this.props.itemId);
            this.props.handler();
           }
          }}
        >
          <Icon>more</Icon>
          Ditails
        </a>
        <a href="#">
          <Icon>edit</Icon>
          Edit
        </a>
        <a
          onClick={() => {
            this.deleteItem(this.props.itemId);
          }}
        >
          <Icon>delete</Icon>
          Delete
        </a>
        <a href="#">
          <Icon>content_copy</Icon>
          Duplicate
        </a>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state => {
  return {
  
  item:state.product.item,
  shoppingList: state.shoppingList,
  }

})

const mapDispatchToProps = (dispatch) => ({
  deleteList: (id) => dispatch(actions.deleteShoppingList(id)),
  getItem:(id)=> dispatch(actions.getProductInstance(id)),
  getShopItem:(id)=> dispatch(actions.getShoppingList(id)),
  getStoreItem:(id) => dispatch(actions.getSupermarket(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
