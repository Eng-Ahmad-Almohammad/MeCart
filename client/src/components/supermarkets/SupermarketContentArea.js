import { Component } from "react";

import { Button, Container, Row,  Col,} from "react-materialize";
import CardItem from "../CardItem/index";
import { connect } from "react-redux";
import { ContentAreaTypes, getAllSupermarkets, getSupermarket } from "../../actions";
import NewStoreModal from "./modals/NewStoreModal";
import CardItemHeader from "../CardItem/CardItemHeader";

class SupermarketContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: this.props.supermarketList,
      change: false,
    };
  }
  componentDidMount() {
    this.props.getData().then(res => {
   
      this.setState({ cards: this.props.supermarketList })
    })



  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.supermarketList.length !== this.props.supermarketList.length) {
      

      this.props.getData().then(res => {
        this.setState({ cards: this.props.supermarketList })
      })
    }
  }



  handlerStoresList = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }



  render() {
    return !this.state.isModalOpen ? (
      <div>
        <Row>
          <Button className="modal-trigger" href="#newStoreModal" node="button" style={{ marginLeft: "40px" }}>
            New Store
          </Button>
          <NewStoreModal  />
        </Row>
        <Row>
          <Container className="content-area">
            {this.state.cards.map((value) => {
              
              return (
                <div>
                  <CardItem
                    type={ContentAreaTypes.SUPERMARKETS}
                    hasMenu={true}
                    listItem={value}
                    address={value.address}
                    handler={this.handlerStoresList}
                    header={<CardItemHeader imageUrl={value.imageUrl} />}
                    title={value.name || ""}
                    className="hoverable"
                    itemDescription={value.businessInfo}
                    onClick={() =>
                      this.setState({ isModalOpen: !this.state.isModalOpen })
                    }

                  >
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '60%',
                        }}
                      >
                        <Col s={6} className="left-align"
                          style={{
                            width: '100%',
                          }}
                        >
                          <span className="star-rating">
                            {value.address}
                          </span>
                        </Col>

                      </div>

                    </div>
                    <p
                      style={{
                        margin: '2px'
                      }}
                    >{value.businessInfo}</p>
                  </CardItem>
                </div>
              );
            })}
          </Container>
        </Row>
      </div>
    ) : (
      <div>
        <Button onClick={() =>
          this.setState({ isModalOpen: !this.state.isModalOpen })
        }>
          close
        </Button>
        <h1>Hello From Here</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  supermarketList: state.supermarketList.supermarkets,
});

const mapDispatchToProp = (dispatch) => ({
  getData: () => dispatch(getAllSupermarkets()),
  getItem: (id) => dispatch(getSupermarket(id))
})
export default connect(mapStateToProps, mapDispatchToProp)(SupermarketContentArea);
