import { Component } from "react";

import { Button, Container, Row } from "react-materialize";
import CardItem from "../CardItem";
import { connect } from "react-redux";
import { ContentAreaTypes,getAllSupermarkets } from "../../actions";
import NewStoreModal from "./modals/NewStoreModal";

class SupermarketContentArea extends Component {
<<<<<<< HEAD
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
=======
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            cards: Array(12)
                .fill("")
                .map((value, index, array) => {
                    return `https://picsum.photos/${200}/${200}`;
                }),
            storeMenuItems: [
                // {
                //     iconName: "edit",
                //     title: "Edit",
                //     onItemClick: (id) => {
                //         console.log({type: "Edit", id})
                //     } // Edit Product by ID function
                // },
                // {
                //     iconName: "delete",
                //     title: "Delete",
                //     onItemClick: (id) => {
                //         console.log({type: "Delete", id})
                //     } // Delete Product by ID function
                // },
                {
                    iconName: "touch_app",
                    title: "Claim",
                    href: "#newStoreOwnershipModal",
                    onItemClick: (id) => {
                        console.log({type: "Claim", id})
                    } // Duplicate Product by ID function
                }
            ]
        };
    }

    async componentDidMount() {
        await this.props.fetchStores();
    }

    render() {
        return (
            <div>
                <Row>
                    <Button className="modal-trigger" href="#newStoreModal" node="button">
                        New Store
                    </Button>
                    <NewStoreModal/>
                    <Button className="modal-trigger" href="#newStoreOwnershipModal" node="button">
                        Take Ownership
                    </Button>
                    <NewStoreOwnershipModal/>
                </Row>
                <Row>
                    <Container className="content-area">
                        {this.props.stores.items.map((value) => {
                            return (
                                <CardItem
                                    type={ContentAreaTypes.SUPERMARKETS}
                                    imageUrl={value.imageUrl}
                                    hasMenu={true}
                                    menuItems={this.state.storeMenuItems}
                                    listItem={value}
                                    onClick={() => {
                                        this.setState({isModalOpen: !this.state.isModalOpen})
                                    }
                                    }
                                />
                            );
                        })}
                    </Container>
                </Row>
            </div>
        );
    }
>>>>>>> 52e37470 (project updates)
}

const mapStateToProps = (state) => ({
  supermarketList: state.supermarketList.supermarkets,
});

const mapDispatchToProp = (dispatch) => ({
  getData :  () =>  dispatch(getAllSupermarkets())
})
export default connect(mapStateToProps,mapDispatchToProp)(SupermarketContentArea);
