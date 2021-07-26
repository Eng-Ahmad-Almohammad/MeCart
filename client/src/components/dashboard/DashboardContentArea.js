import { random } from "lodash";
import React, { Component } from "react";
import { Button, Container, Modal } from "react-materialize";
import { ContentAreaTypes } from "../../actions";
import CardItem from "../CardItem";

class DashboardContentArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      cards: Array(12)
        .fill("")
        .map((value, index, array) => {
          return `https://picsum.photos/${random(200, 300)}/${random(
            250,
            350
          )}`;
        }),
    };
  }
  renderContent() {
    return (
      <Container className="content-area">
        {this.state.cards.map((imageUrl) => {
          return (
          <div> Not Avaliable Now</div>
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

export default DashboardContentArea;
