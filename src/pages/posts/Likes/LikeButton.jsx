import React, { useContext, useEffect, useReducer, useState } from "react";
import heart_outline from "../../../assets/icons/heart_outline.png";
import heart from "../../../assets/icons/heart.png";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { IconButton } from "@material-tailwind/react";
import { AuthContext } from "../../../components/Context/Context";
import {
  Reducer,
  postActions,
  postState,
} from "../../../components/Context/Reducer";
const LikeButton = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(Reducer, postState);
  const likesCollection = collection(db, "posts", id, "likes");
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const likesQuery = query(likesCollection, where("id", "==", user?.uid));
    const likesQuerySnapshot = await getDocs(likesQuery);
    const likesDocId = await likesQuerySnapshot.docs[0]?.id;

    try {
      if (likesDocId !== undefined) {
        const deleteLikeId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteLikeId);
        setLiked(false);
      } else {
        await setDoc(doc(likesCollection, user?.uid), {
          id: user?.uid,
          name: user?.displayName,
          photoURL: user?.photoURL,
        });
        console.log("Post liked");
        setLiked(true);
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const likesQuery = collection(db, "posts", id, "likes");
        await onSnapshot(likesQuery, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
          const userLiked = doc.docs.some((item) => item.id === user?.uid);
          setLiked(userLiked);
          console.log(userLiked);
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
      }
    };

    return () => getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR, user?.uid]);
  return (
    <div>
      <IconButton
        size="lg"
        variant="text"
        className="rounded-full"
        onClick={handleLike}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {liked || isHovered ? (
          <>
            <img src={heart} alt="heart" />
          </>
        ) : (
          <>
            <img src={heart_outline} alt="heart outlined" />
          </>
        )}
      </IconButton>
    </div>
  );
};

export default LikeButton;
