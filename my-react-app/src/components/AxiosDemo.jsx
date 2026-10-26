import { useState, useEffect } from "react";
import axios from "axios";

function AxiosDemo() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h2>Axios Demo</h2>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default AxiosDemo;
