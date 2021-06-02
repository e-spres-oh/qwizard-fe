import React from "react";

const Hat = ({ hat, imageStyle }) => {
  return (
    <img
      className={imageStyle || "responsive-image"}
      alt={hat}
      src={require(`../static/svg/hats/${hat}.svg`).default}
    ></img>
  );
};

export default Hat;
