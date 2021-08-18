import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-materialize";
import AddToListModal from "./add_modal/NewShoppingListItem";
import NewIsntaceModal from "./new_modal/newInstance"
import { CardTitle, Card, Icon } from "react-materialize";
class ProductInstance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
    }

    render() {
        console.log(this.props.item);
        return (
            <div>

                <Row >
                    <Col
                        m={4}
                        s={12}
                    >

                        <Button onClick={() =>
                            this.props.handler()
                        }>
                            close
                        </Button>
                    </Col>
                    <Col
                        m={8}
                        s={12}
                    >
                        <Button
                            className="modal-trigger"
                            href="#newInsatanceModal"
                            node="button"
                        >
                            Add New Instance
                        </Button>
                        <NewIsntaceModal id={this.props.id} />
                    </Col>


                </Row>

                <Row>
                    <Container className="content-area">
                        {
                            this.props.item.map(instance => {

                                return (
                                    <Row>
                                        <Col
                                            m={12}
                                            s={12}
                                        >
                                            <Card
                                                closeIcon={<Icon>close</Icon>}
                                                header={<CardTitle image="https://materializecss.com/images/sample-1.jpg" reveal waves="light" />}
                                                reveal={
                                                    <>
                                                        <p>priceBeforeTax {instance.priceBeforeTax}</p>
                                                        <p>priceAfterTax {instance.priceAfterTax}</p>
                                                        <p>unitOfMeasure {instance.unitOfMeasure}</p>
                                                        <p>measurement {instance.measurement}</p>

                                                        <Button
                                                            className="modal-trigger"
                                                            href="#newProductModal"
                                                            node="button"
                                                            style={{
                                                                display: "inline-block",
                                                                textAlign: "center",
                                                                fontSize: "10px"
                                                            }}
                                                        >
                                                            Add to shopping list
                                                        </Button>
                                                        <AddToListModal item={instance} />
                                                    </>
                                                }
                                                revealIcon={<Icon>more_vert</Icon>}
                                                title="Card Title"
                                            >
                                                <p>

                                                </p>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Container>
                </Row>
            </div>
        )
    }
}
export default ProductInstance;



