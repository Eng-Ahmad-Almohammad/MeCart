import React from "react";
import { CardTitle } from "react-materialize";

const CardItemHeader = ({ imageUrl }) => {
  return <CardTitle image={imageUrl || null} />;
};

export default CardItemHeader;
