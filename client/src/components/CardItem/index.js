import { random } from "lodash";
import React, { useState } from "react";
import { Card, Col, Icon, Button, Dropdown } from "react-materialize";

import CardItemHeader from "./CardItemHeader";
import "./styles.scss";
import Menu from "./Menu";

const CardItem = ({
  imageUrl,
  title ,
  hasMenu = false,
  listItem,
  itemDescription = "Item Description",
  rating = random(0.0, 1.0, true),
  type,
  handler,
}) => {
  rating = rating * 5.0;

  const [menu, setMenu] = useState(hasMenu);

  const stars = [];
  for (var i = 0; i < 5; i++) {
    if (rating >= 1) {
      stars[i] = "star";
    } else if ((rating > 0) & (rating < 1)) {
      stars[i] = "star_half";
    } else {
      stars[i] = "star_border";
    }
    rating -= 1.0;
  }

  const showMenu = () => {
    if (menu && listItem && listItem._id) {
      return <Menu handler={handler} itemId={listItem._id} itemType = {type} />;
    }
  };

  return (
    <Card
      header={<CardItemHeader imageUrl={imageUrl} />}
      title={title || ""}
      className="hoverable"
      actions={[]}
      onClick={()=>{

      }

      }
     >
      {showMenu()}
      <p>{itemDescription}</p>
      <Col s={6} className="left-align">
        <span className="star-rating">
          {stars.map((value) => (
            <Icon>{value}</Icon>
          ))}
        </span>
      </Col>
      <Col s={6} className="right-align">
        <span>$10.00</span>
      </Col>
    </Card>
  );
};

export default CardItem;
