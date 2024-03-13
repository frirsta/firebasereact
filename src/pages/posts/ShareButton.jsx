import React, { useState } from "react";
import share from "../../assets/icons/share.png";
import share_outline from "../../assets/icons/share_outline.png";
import { IconButton } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
const ShareButton = () => {
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
            <img src={share} alt="share" />
          </>
        ) : (
          <>
            <img src={share_outline} alt="share outlined" />
          </>
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ShareButton;
