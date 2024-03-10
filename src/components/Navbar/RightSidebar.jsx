import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Context";
import { Button, Input } from "@material-tailwind/react";
import { db } from "../../firebase/firebase";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const RightSidebar = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;

  const filteredFriends = friendList?.filter((friend) => {
    return friend.name.toLowerCase().includes(input.toLowerCase());
  });
  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  return (
    <div>
      <Input
        name="input"
        value={input}
        type="text"
        placeholder="Search"
        onChange={(e) => setInput(e.target.value)}
      />

      {friendList?.length > 0 ? (
        filteredFriends?.map((friend) => {
          return (
            <div key={friend.id}>
              <Link to={`/profile/${friend.id}`}>Profile</Link>
              <h1>{friend.name}</h1>
              <Button
                onClick={() =>
                  removeFriend(friend.id, friend.name, friend.image)
                }
              >
                unFollow
              </Button>
            </div>
          );
        })
      ) : (
        <h1>No Friends</h1>
      )}
    </div>
  );
};

export default RightSidebar;
