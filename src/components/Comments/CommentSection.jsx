import React, { useContext, useEffect, useReducer, useRef } from "react";
import { AuthContext } from "../Context/Context";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Avatar, Button, avatar } from "@material-tailwind/react";
import Comment from "./Comment";
import { db } from "../../firebase/firebase";
import { postActions, Reducer, postState } from "../Context/Reducer";

const CommentSection = ({ postId }) => {
  const comment = useRef("");
  const { user, userData } = useContext(AuthContext);
  const commentRef = doc(collection(db, "posts", postId, "comments"));
  const [state, dispatch] = useReducer(Reducer, postState);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  const addComment = async (e) => {
    e.preventDefault();
    if (comment.current.value !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: comment.current.value,
          image: user?.photoURL,
          name:
            userData?.name?.charAt(0)?.toUpperCase() +
              userData?.name?.slice(1) || user?.displayName?.split(" ")[0],
          timestamp: serverTimestamp(),
        });
        comment.current.value = "";
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        alert(error.message);
        console.log(error);
      }
    }
    console.log(postId);
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionsOfComments = collection(
          db,
          `posts/${postId}/comments`
        );
        const q = query(collectionsOfComments, orderBy("timestamp", "desc"));
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_COMMENT,
            comments: doc.docs?.map((item) => item.data()),
          });
        });
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        alert(error.message);
        console.error(error);
      }
    };
    return () => getComments();
  }, [ADD_COMMENT, postId, HANDLE_ERROR]);
  return (
    <div>
      <div>
        <div>
          <Avatar src={user?.photoURL || avatar}></Avatar>
        </div>
        <form onSubmit={addComment}>
          <input
            name="comment"
            type="text"
            placeholder="Write a comment"
            ref={comment}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      {state?.comments?.map((item, index) => {
        return (
          <Comment
            key={index}
            image={item?.image}
            comment={item?.comment}
            name={item?.name}
          ></Comment>
        );
      })}
    </div>
  );
};

export default CommentSection;
