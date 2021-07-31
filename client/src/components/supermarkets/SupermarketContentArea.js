import { Component } from "react";

import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes,getAllSupermarkets } from "../../actions";
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
    return (
      <div>
        <Row>
          <Button className="modal-trigger" href="#newStoreModal" node="button">
            New Store
          </Button>
          <NewStoreModal />
        </Row>
        <Row>
          <Container className="content-area">
            {this.state.cards.map((value) => {
              return (
                <CardItem
                  type={ContentAreaTypes.SUPERMARKETS}
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

const mapStateToProps = (state) => ({
  supermarketList: state.supermarketList.supermarkets,
});

const mapDispatchToProp = (dispatch) => ({
  getData :  () =>  dispatch(getAllSupermarkets())
})
export default connect(mapStateToProps,mapDispatchToProp)(SupermarketContentArea);
