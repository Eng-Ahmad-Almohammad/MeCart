import { random } from "lodash";
import React, { useState } from "react";
import { Card, Col,} from "react-materialize";

import CardItemHeader from "./CardItemHeader";
import "./styles.scss";
import "./style.css";
import Menu from "./Menu";

const CardItem = ({
  imageUrl,
  itemsNu,
  title,
  hasMenu = false,
  listItem,
  itemDescription = "Item Description",
  rating = random(0.0, 1.0, true),
  type,
  handler,
}) => {
  rating = rating * 5.0;

  // eslint-disable-next-line no-unused-vars
  const [menu, setMenu] = useState(hasMenu);

  const showMenu = () => {
    if (menu && listItem && listItem._id) {
      return <Menu handler={handler} itemId={listItem._id} itemType={type} />;
    }
  };

  return (
    <Card
      header={<CardItemHeader imageUrl={imageUrl} />}
      title={title || ""}
      className="hoverable"
      actions={[]}
      onClick={() => {

      }

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
              Items: {itemsNu}
            </span>
          </Col>

        </div>
        {showMenu()}

      </div>
      <p
        style={{
          margin: '2px'
        }}
      >{itemDescription}</p>
    </Card>
  );
};

export default CardItem;
