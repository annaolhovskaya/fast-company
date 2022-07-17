import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [status, setStatus] = useState(false);

  const handleDelete = (userId) => {
    console.log('userId', userId);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const updateUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !status;
      }

      return user;
    });

    setUsers(updateUsers);
    setStatus(!status);
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  );
};

export default App;
