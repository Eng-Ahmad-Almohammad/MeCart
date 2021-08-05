import { random } from "lodash";
import React, { useState } from "react";
import { Card, Col, Icon, Button, Dropdown } from "react-materialize";

import CardItemHeader from "./CardItemHeader";
import "./styles.scss";
import Menu from "./Menu";

const CardItem = ({
  imageUrl,
  title = "Title",
  hasMenu,
  listItem,
  itemDescription = "Item Description",
  rating = random(0.0, 1.0, true),
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

<<<<<<< HEAD
  const showMenu = () => {
    if (menu && listItem && listItem._id) {
      return <Menu itemId={listItem._id} />;
    }
  };

  return (
    <Card
      header={<CardItemHeader imageUrl={imageUrl} />}
      title={listItem.name || ""}
      className="hoverable"
      actions={[]}
      onClick={()=>{
       console.log('from click====',listItem)
      }
       
      }
     >
      {showMenu()}
      <p>{listItem.descriptionOne}</p>
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
=======
    const showMenu = () => {
        if (menu && Array.isArray(menuItems) && menuItems.length > 0) {
            return <Menu itemId={itemId} menuItems={menuItems}/>;
        }
    };

    return (
        <a href="#" onClick={onClick}>
            <div>
                <Card
                    header={<CardItemHeader imageUrl={imageUrl}/>}
                    title={title || ""}
                    className="hoverable"
                    actions={[
                        <a key="1" href="#">This is a link</a>,
                        <a key="2" href="#">This is a link</a>
                    ]}
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
            </div>
        </a>
    );
>>>>>>> 52e37470 (project updates)
};

export default CardItem;
