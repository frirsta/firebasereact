import { Avatar } from "@material-tailwind/react";
import React from "react";
import avatar from "../../assets/images/avatar.jpg";

const Comment = ({ name, comment, image }) => {
  return (
    <div>
      <div>
        <Avatar src={image || avatar}></Avatar>
        <p>{name}</p>
      </div>
      <div>{comment}</div>
    </div>
  );
};

export default Comment;
