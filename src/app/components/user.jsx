import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';

const User = ({ data, onDelete, onToggleBookMark }) => {
  return (
    <>
      <tr key={data._id}>
        <td>{data.name}</td>
        <td>
          <Qualitie data={data.qualities} />
        </td>
        <td>{data.profession.name}</td>
        <td>{data.completedMeetings}</td>
        <td>{data.rate} /5</td>
        <td>
          <BookMark
            id={data._id}
            status={data.bookmark}
            onToggleBookMark={onToggleBookMark}
          />
        </td>
        <td>
          <button onClick={() => onDelete(data._id)} className="btn btn-danger">
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
