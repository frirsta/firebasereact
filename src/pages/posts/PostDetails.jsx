import React, { useContext, useEffect, useReducer, useState } from "react";
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
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import CommentSection from "../../components/Comments/CommentSection";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./Likes/LikeButton";
import ShareButton from "./ShareButton";
import CommentButton from "../../components/Comments/CommentButton";
import PostModal from "./PostModal";
import UserAvatar from "../../components/ProfileCard/UserAvatar";
import PostMenu from "../../components/PostMenu/PostMenu";
import {
  Reducer,
  postActions,
  postState,
} from "../../components/Context/Reducer";
import DisplayUserImages from "./Likes/DisplayUserImages";
const PostDetails = ({
  id,
  image,
  logo,
  name,
  text,
  timestamp,
  uid,
  email,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, userData } = useContext(AuthContext);
  const postDocument = doc(db, "posts", id);
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(Reducer, postState);
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const friendList = userData?.friends;
  const openModal = () => {
    setIsModalOpen((cur) => !cur);
  };

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
  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
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
      }
    };
    return () => getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR, user?.uid]);

  return (
    <div className="bg-gray-100 p-4">
      <Card className="bg-white border rounded-sm max-w-md">
        <CardHeader
          className="flex items-center justify-between"
          shadow={false}
          floated={false}
        >
          <div className="flex items-center mb-3">
            <UserAvatar width={"30px"} image={logo} name={name} />
            <Typography className="ml-3">{name}</Typography>
          </div>
          <div className="flex items-center mb-3">
            {user?.email === email ? (
              <PostMenu handledelete={deletePost} />
            ) : friendList?.length > 0 ? (
              friendList?.map(
                (friend) =>
                  friend.id === uid && (
                    <Button
                      onClick={() =>
                        removeFriend(friend.id, friend.name, friend.image)
                      }
                    >
                      Unfollow
                    </Button>
                  )
              )
            ) : (
              <Button onClick={addUser}>Follow</Button>
            )}
          </div>
        </CardHeader>
        <img src={image} alt={text} className="h-full w-full object-cover" />
        <CardBody className="w-100 p-3">
          <div className="flex justify-between">
            <div className="flex flex-row justify-start">
              <LikeButton id={id} /> <CommentButton openModal={openModal} />
              <ShareButton />
            </div>
            <div>
              <BookmarkButton />
            </div>
          </div>
          <div className="ml-3 flex justify-start items-baseline">
            {state?.likes && (
              <DisplayUserImages
                users={state.likes}
                open={open}
                handleOpen={handleOpen}
              />
            )}
            <Typography className="mt-3 ml-1">
              {state?.likes.length > 0 && state?.likes.length}
            </Typography>
          </div>
          <hr className="my-3 border-blue-gray-50 w-100" />
        </CardBody>

        <CardFooter className="flex flex-col justify-between">
          <CommentSection postId={id} />
        </CardFooter>
      </Card>

      <PostModal
        handler={openModal}
        isOpen={isModalOpen}
        id={postDocument.id}
        image={image}
        logo={logo}
        name={name}
        text={timestamp}
        timestamp={timestamp}
        uid={uid}
      />
    </div>
  );
};

export default PostDetails;
