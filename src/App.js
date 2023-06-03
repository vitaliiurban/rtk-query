import { useState } from "react";
import { useGetUsersQuery, useUpdateUserMutation } from "./api";

const App = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [username, setUsername] = useState("");
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }
  const handleUpdateNickname = (user) => {
    updateUser({ ...user, username: username });
  };

  return (
    <div className="container">
      {users.map((user) => (
        <div key={user.id} className="user">
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.username}</div>
          <button onClick={() => handleUpdateNickname(user)}>
            Change nickname
          </button>
        </div>
      ))}
      <div className="input">
        <div>Type here new nickname:</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="nickname"
        />
      </div>
    </div>
  );
};

export default App;
