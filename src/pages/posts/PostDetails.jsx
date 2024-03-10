import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/Context/Context";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Button, Typography } from "@material-tailwind/react";
import CommentSection from "../../components/Comments/CommentSection";
import LikeButton from "./LikeButton";
const PostDetails = ({ id, image, logo, name, text, timestamp, uid }) => {
  const { user } = useContext(AuthContext);
  const postDocument = doc(db, "posts", id);
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const addUser = async () => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", user?.uid)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].ref;
        await updateDoc(userData, {
          friends: arrayUnion({
            id: uid,
            image: logo,
            name: name,
          }),
        });
      } else {
        console.error("User document not found.");
      }
    } catch (err) {
      alert(err.message);
      console.error(err.message);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        await deleteDoc(postDocument);
      } else {
        alert("You can only delete your own posts");
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  return (
    <div>
      <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
        <div className="m-0 rounded-none">
          {image && (
            <img
              className="transition-transform group-hover:scale-110 duration-400"
              alt={text}
              src={image}
            />
          )}

          <h1>{name}</h1>
        </div>
        <div>
          <Typography>{text}</Typography>
          <Typography>Published: {timestamp}</Typography>
        </div>
        <div className="flex items-center justify-between">
          <LikeButton id={id} />
          {user?.uid !== uid && <Button onClick={addUser}>Add</Button>}
          <Button onClick={deletePost}>Delete</Button>
        </div>
      </div>
      <div
        className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
        onClick={handleOpen}
      >
        Comments
      </div>
      {open && <CommentSection postId={id} />}
    </div>
  );
};

export default PostDetails;
