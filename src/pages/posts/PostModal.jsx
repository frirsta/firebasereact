import React from "react";
import CommentSection from "../../components/Comments/CommentSection";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import UserAvatar from "../../components/ProfileCard/UserAvatar";
import PostMenu from "../../components/PostMenu/PostMenu";
const PostModal = ({
  isOpen,
  onClose,
  id,
  image,
  logo,
  name,
  text,
  timestamp,
  uid,
}) => {
  return (
    <Dialog className="w-full max-w-[48rem] flex flex-row" open={isOpen}>
      <DialogHeader className="m-0 w-2/5 shrink-0 rounded-r-none">
        <img src={image} alt={text} className="h-full w-full object-cover" />
      </DialogHeader>
      <DialogBody className="flex flex-col justify-start">
        <div className="flex justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <UserAvatar src={logo} />
            <Typography className="text-lg font-bold mb-0 ml-3">
              {name}
            </Typography>
          </div>
          <PostMenu />
        </div>
        <hr className="my-8 border-blue-gray-50 w-100" />
        <Typography className="text-gray-700">{text}</Typography>

        <IconButton className="rounded-full" variant="text" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </IconButton>
        <CommentSection postId={id} />
      </DialogBody>
    </Dialog>
  );
};

export default PostModal;
