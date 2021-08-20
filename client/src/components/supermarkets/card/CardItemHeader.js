import React from "react";
import { CardTitle } from "react-materialize";

const CardItemHeader = ({ imageUrl }) => {
  return <CardTitle image={imageUrl || "https://i.ibb.co/Rhg3rp0/Nooo.png"} />;
};

export default CardItemHeader;
