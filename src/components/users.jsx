import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const words = ['человек', 'человека', 'человек'];
  const verbs = ['тусанет', 'тусанут', 'тусанет'];

  const getBadgeClasses = () => {
    let classes = 'fs-3 badge ';
    classes += users.length === 0 ? 'bg-danger' : 'bg-primary';

    return classes;
  };

  const declOfNum = (number, words) => {
    let cases = [2, 0, 1, 1, 1, 2];
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    let phrase = '';
    phrase +=
      users.length !== 0
        ? `${number} ${declOfNum(number, words)} ${declOfNum(
            number,
            verbs
          )} с тобой сегодня`
        : 'Никто с тобой не тусанет';

    return phrase;
  };

  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((qualitie) => (
            <span
              key={qualitie._id}
              className={`badge bg-${qualitie.color} m-1`}
            >
              {qualitie.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className={getBadgeClasses()}>{renderPhrase(users.length)}</div>
      <table className="table">
        <thead>
          {users.length !== 0 ? (
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th></th>
            </tr>
          ) : null}
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
