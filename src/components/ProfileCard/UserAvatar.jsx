import React from "react";
import avatar from "../../assets/images/avatar.jpg";
import { Avatar } from "@material-tailwind/react";
const UserAvatar = ({ image, name, height, width }) => {
  return (
    <div>
      <Avatar
        height={height}
        width={width}
        alt={name}
        src={image || avatar}
        className="object-cover object-center rounded-full h-50 w-50"
        data-popover-target="profile-menu"
      />
    </div>
  );
};

export default UserAvatar;
