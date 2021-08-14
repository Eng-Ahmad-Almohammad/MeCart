import { Component } from "react";

import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes,getAllSupermarkets, getSupermarket } from "../../actions";
import NewStoreModal from "./modals/NewStoreModal";

class SupermarketContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: this.props.supermarketList,
    };
  }
  componentDidMount(){
    this.props.getData().then(res =>{
      // console.log('Hellllllllllllo',this.props.storeList)
    this.setState({ cards: this.props.supermarketList })
    })


  }
  render() {
    return !this.state.isModalOpen?(
      <div>
        <Row>
          <Button className="modal-trigger" href="#newStoreModal" node="button" style={{marginLeft: "40px"}}>
            New Store
          </Button>
          <NewStoreModal />
        </Row>
        <Row>
          <Container className="content-area">
            {this.state.cards.map((value) => {
              return (
                <div  onClick={async() =>{
                  await this.props.getItem(value._id);
                  console.log("from click========>",this.props.item);
                  this.setState({ isModalOpen: !this.state.isModalOpen });
                }}>
                <CardItem
                  type={ContentAreaTypes.SUPERMARKETS}
                  imageUrl={value.imageUrl}
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
        <Button onClick={()=>
        this.setState({ isModalOpen: !this.state.isModalOpen })
        }>
          close
        </Button>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  supermarketList: state.supermarketList.supermarkets,
});

const mapDispatchToProp = (dispatch) => ({
  getData :  () =>  dispatch(getAllSupermarkets()),
  getItem:(id) => dispatch(getSupermarket(id))
})
export default connect(mapStateToProps,mapDispatchToProp)(SupermarketContentArea);
