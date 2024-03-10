import React, { useEffect, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CardSection = () => {
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    };
    return () => getUsers();
  }, [users, usersCollection]);

  return (
    <div>
      <div>
        {users.map((item, index) => {
          return (
            <ProfileCard
              key={index}
              id={item?.card}
              name={item?.name}
              image={item?.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardSection;
