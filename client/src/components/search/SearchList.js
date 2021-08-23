import React from 'react';
import CardItem from "../CardItem";
import { ContentAreaTypes } from '../../actions'
import { useState } from "react";
import ProductInstance from "../instances/productInstancesArea";
import { Row, Container } from 'react-materialize';


const SearchList = ({ products = [] }) => {


  const [isModalOpen, useIsModalOpen] = useState(true)
  const [productId, useProductId] = useState('');


  const handleModal = (id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIsModalOpen(!isModalOpen)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useProductId(id)
    // this.setState({ isModalOpen: !this.state.isModalOpen, ProductIn: this.props.storeList.product,productId:id})
  }
  return (
    isModalOpen ? (
      <>
        <Row style={{
          overflow: 'hidden',
          width: '100%',
          margin: '10px',
        }}>
          <Container className="content-area">
            {products.map((data, index) => {
              if (data) {
                return (
                  <div>
                    <CardItem
                      type={ContentAreaTypes.PRODUCTS}
                      imageUrl={data.imageUrl}
                      hasMenu={false}
                      listItem={data}
                      handler={handleModal}
                      title={data.name}
                      itemDescription={data.descriptionOne}
                    />
                  </div>
                )
              }
              return null
            })}
          </Container>
        </Row>
      </>
    ) :
      (
        <ProductInstance handler={handleModal} id={productId} />
      )
  );
}

export default SearchList
