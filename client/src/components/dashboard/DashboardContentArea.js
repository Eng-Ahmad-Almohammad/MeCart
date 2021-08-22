import { random } from "lodash";
import React, { Component } from "react";
import { Button, Container, Modal } from "react-materialize";
import { ContentAreaTypes, getAllProducts } from "../../actions";
import { connect } from "react-redux";
import CardItem from "../CardItem";

class DashboardContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: this.props.storeList
    };
  }

  componentDidMount() {

    this.props.getData().then(res => {

      this.setState({ cards: this.props.storeList })
    })
  }

  renderContent() {
   
    return (
      <Container className="content-area">
        {this.state.cards.map((imageUrl, index) => {
          return (
            // <div> Not Avaliable Now</div>
            <CardItem
              key={`dashboard-${imageUrl._id}`}
              type={ContentAreaTypes.DEFAULT}
              imageUrl={`https://picsum.photos/${random(200, 300)}/${random(
                250,
                350
              )}`}
              onClick={() => {
                this.setState({ isModalOpen: !this.state.isModalOpen });
               
              }}
            />
          );
        })}
        {this.state.isModalOpen && (
          <Modal
            actions={[
              <Button flat modal="close" node="button" waves="green">
                Delete
              </Button>,
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Modal Header"
            id="modal2"
            open={true}
            options={{
              dismissible: false,
              endingTop: "10%",
              inDuration: 250,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              opacity: 0.5,
              outDuration: 250,
              preventScrolling: true,
              startingTop: "4%",
            }}
          >
            Are you sure you want to delete this record
          </Modal>
        )}
      </Container>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state => {
  return {
    storeList: state.product.product
  }

}
)
const mapDispatchToProp = (dispatch) => ({
  getData: () => dispatch(getAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProp)(DashboardContentArea);
