import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const FriendProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const q = query(collection(db, "users"), where("uid", "==", id));
      await onSnapshot(q, (doc) => {
        setProfile(doc.docs[0].data());
      });
    };
    getUserProfile();
  }, [id]);
  console.log(profile);

  return <div>{profile?.name}</div>;
};

export default FriendProfile;
