import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import post_menu from "../../assets/icons/post_menu.png";
const PostMenu = ({ handledelete }) => {
  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text" className="rounded-full">
          <img src={post_menu} alt="post menu" className="rounded-full" />
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2">
        <MenuItem
          onClick={handledelete}
          className="flex items-center gap-4 py-2 pl-2 pr-8"
        >
          <Typography variant="small" className="font-medium">
            Delete
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
          <Typography variant="small" className="font-medium">
            Edit
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostMenu;
