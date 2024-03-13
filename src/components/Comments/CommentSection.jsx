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
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { db } from "../../firebase/firebase";
import { postActions, Reducer, postState } from "../Context/Reducer";
import smile_icon from "../../assets/icons/smile_icon.png";
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
      <div className="flex justify-between items-center w-100">
        <div className="mr-3">
          <Tooltip
            content="Coming Soon!"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <IconButton variant="text">
              <img src={smile_icon} alt="smile icon" />
            </IconButton>
          </Tooltip>
        </div>
        <form
          className="flex justify-between items-center w-100"
          onSubmit={addComment}
        >
          <input
            className="text-sm h-10 w-full outline-none focus:outline-none"
            placeholder="Add a comment"
            name="comment"
            type="text"
            ref={comment}
          />
          <Button
            variant="text"
            type="submit"
            className="text-blue-500 opacity-75 text-right font-bold"
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
