import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="user-list glassmorphism">
      <h2>Online Users</h2>
      {users.map((user) => (
        <div key={user.id} className="user-item">
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;