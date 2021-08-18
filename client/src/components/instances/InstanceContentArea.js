import React, {Component} from "react";
import {Button, Container, Row} from "react-materialize";
import CardItem from "../CardItem";
import {connect} from "react-redux";
import {ContentAreaTypes, deleteProduct, getAllProducts} from "../../actions";
import NewProductModal from "./modals/NewInstanceModal";

class InstanceContentArea extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)

        this.state = {
            isModalOpen: false,
            cards: Array(12)
                .fill("")
                .map((value, index, array) => {
                    return `https://picsum.photos/${250}/${250}`;
                }),
            productMenuItems: [
                {
                    iconName: "edit",
                    title: "Edit",
                    onItemClick: (id) => {
                        console.log({type: "Edit", id})
                    } // Edit Product by ID function
                },
                {
                    iconName: "delete",
                    title: "Delete",
                    onItemClick: (id) => {
                        console.log({type: "Delete", id})
                    } // Delete Product by ID function
                },
                {
                    iconName: "content_copy",
                    title: "Duplicate",
                    onItemClick: (id) => {
                        console.log({type: "Duplicate", id})
                    } // Duplicate Product by ID function
                }
            ]
        };
    }

    async componentDidMount() {
        await this.props.fetchProducts();
    }

    render() {
        console.log({products: this.props.products})
        return (
            <div>
                <Row>
                    <Button
                        className="modal-trigger"
                        href="#newProductModal"
                        node="button"
                    >
                        New Product
                    </Button>
                    <NewProductModal/>
                </Row>
                <Row>
                    <Container className="content-area">
                        {this.state.cards.map((value) => {
                            console.log("<<<<<< the value >>>>>>>: " + value._id);
                            return (
                                <CardItem
                                    key={`product-${value._id}}`}
                                    itemId={value._id}
                                    type={ContentAreaTypes.PRODUCTS}
                                    imageUrl={value}
                                    hasMenu={true}
                                    menuItems={this.state.productMenuItems}
                                    onClick={() => {
                                        this.setState({isModalOpen: !this.state.isModalOpen});
                                        console.log("I was clicked alright");
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
}

const mapStateToProps = (state) => ({
    products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: async () => dispatch(await getAllProducts()),
    deleteProduct: async (id) => dispatch(await deleteProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(InstanceContentArea);
