import React, { useContext, useEffect, useReducer } from "react";
import { AuthContext } from "../../components/Context/Context";
import {
  Reducer,
  postActions,
  postState,
} from "../../components/Context/Reducer";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import CommentSection from "../../components/Comments/CommentSection";

const PostDetails = ({
  email,
  id,
  image,
  logo,
  name,
  text,
  timestamp,
  uid,
}) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(Reducer, postState);
  const likesCollection = collection(db, "posts", id, "likes");
  const postDocument = doc(db, "posts", id);
  const { ADD_LIKE, HANDLE_ERROR } = postActions;

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

  const handleLike = async (e) => {
    e.preventDefault();
    const likesQuery = query(likesCollection, where("id", "==", user?.uid));
    const likesQuerySnapshot = await getDocs(likesQuery);
    const likesDocId = await likesQuerySnapshot.docs[0]?.id;

    try {
      if (likesDocId !== undefined) {
        const deleteLikeId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteLikeId);
      } else {
        await setDoc(doc(likesCollection, user?.uid), {
          id: user?.uid,
        });
        console.log("Likes document not found");
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
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

  useEffect(() => {
    const getLikes = async () => {
      try {
        const likesQuery = collection(db, "posts", id, "likes");
        await onSnapshot(likesQuery, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err);
      }
    };

    return () => getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR]);

  return (
    <div>
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img alt={text} src={image} />
          <h1>{name}</h1>
        </CardHeader>
        <CardBody>
          <p>{text}</p>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <Button onClick={handleLike}>Like</Button>{" "}
          {state.likes?.length > 0 && state?.likes?.length}
          <Button onClick={addUser}>Add</Button>
          <Button onClick={deletePost}>Delete</Button>
        </CardFooter>
      </Card>
      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetails;
