import React, { useState } from "react";
import bookmark from "../../assets/icons/bookmark.png";
import bookmark_outline from "../../assets/icons/bookmark_outline.png";
import { IconButton } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
const BookmarkButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Tooltip
      content="Coming Soon!"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <IconButton
        size="lg"
        variant="text"
        className="rounded-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <>
            <img src={bookmark} alt="share" />
          </>
        ) : (
          <>
            <img src={bookmark_outline} alt="share outlined" />
          </>
        )}
      </IconButton>
    </Tooltip>
  );
};

export default BookmarkButton;
