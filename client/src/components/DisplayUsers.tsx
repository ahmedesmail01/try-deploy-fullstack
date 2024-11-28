import React, { useEffect, useState } from "react";

interface IUser {
  id: number;
  name: string;
  age: number;
}

const DisplayUsers = () => {
  const [users, setUsers] = useState<IUser[]>();

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://try-deploy-fullstack-server.vercel.app/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);

  return (
    <div>
      <h1>DisplayUsers</h1>
      <div>
        {users &&
          users.map((user) => (
            <div key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.age}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayUsers;
