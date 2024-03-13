import React, { useState } from "react";
import chat from "../../assets/icons/chat.png";
import chat_outline from "../../assets/icons/chat_outline.png";
import { IconButton } from "@material-tailwind/react";

const CommentButton = ({ openModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    openModal();
  };

  return (
    <div>
      <IconButton
        size="lg"
        variant="text"
        className="rounded-full"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <>
            <img src={chat} alt="comment" />
          </>
        ) : (
          <>
            <img src={chat_outline} alt="comment outlined" />
          </>
        )}
      </IconButton>
    </div>
  );
};

export default CommentButton;
