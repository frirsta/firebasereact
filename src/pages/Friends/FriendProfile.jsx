import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
const FriendProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getProfiles = async () => {
      const q = query(collection(db, "profiles"), where("id", "==", id));
    };
  }, [id]);
  return <div>FriendProfile</div>;
};

export default FriendProfile;
