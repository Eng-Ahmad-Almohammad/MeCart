/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Button, Dropdown } from "react-materialize";
import * as actions from "../../actions";
import { connect } from "react-redux";
import Show from "../Show";
import NewProductModal from "../products/modals/NewProductModal";
import NewStoreModal from "../supermarkets/modals/NewStoreModal"

class Menu extends Component {

  constructor(props) {
    super(props)
    this.setState({
      type: this.props.itemType,
      itemId: this.props.itemId,
    })
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
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a
          onClick={async () => {
            if (this.props.itemType === 'Products') {
              await this.props.getItem(this.props.itemId);
              this.props.handler(this.props.itemId._id);
            }
            else if (this.props.itemType === 'Shopping') {
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
          Details
        </a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <Show condition={this.props.itemType === 'Products'}>
        <a 
        className="modal-trigger"
        href="#newProductModal"
        node="button"
        onClick={async () => {
          await this.props.getProduct(this.props.itemId)
        }}
        >
          <Icon>edit</Icon>
          Edit
        </a>
        <NewProductModal category={this.props.category}/>
        </Show>

        <Show condition={this.props.itemType === "Supermarkets"}>
        <a 
        className="modal-trigger"
        href="#newStoreModal" 
        node="button" 
        onClick={async () => {
          await this.props.getStore(this.props.itemId)
        }}
        >
          <Icon>edit</Icon>
          Edit
        </a>
        <NewStoreModal />
        </Show>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a
          onClick={() => {
            if(this.props.itemType === 'Shopping'){
            this.deleteItem(this.props.itemId);
            }
            else if (this.props.itemType === 'Products'){
             this.props.deleteProduct(this.props.itemId)
               }
            
            else if (this.props.itemType === 'Supermarkets') {
            this.props.deleteStore(this.props.itemId);
            }
          }}
        >
          <Icon>delete</Icon>
          Delete
        </a>

      </Dropdown>
    );
  }
}

const mapStateToProps = (state => {
  return {
    shoppingList: state.shoppingList,
    category: state.product.category,
  }

})

const mapDispatchToProps = (dispatch) => ({
  deleteList: (id) => dispatch(actions.deleteShoppingList(id)),

  deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  deleteStore : (id) => dispatch(actions.deleteStore(id)),
  getItem:(id)=> dispatch(actions.getProductInstance(id)),
  getShopItem:(id)=> dispatch(actions.getShoppingList(id)),
  getStoreItem:(id) => dispatch(actions.getSupermarket(id)),

  getProduct:(id)=>dispatch(actions.getProduct(id)),
  getStore:(id)=>dispatch(actions.getSupermarket(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
