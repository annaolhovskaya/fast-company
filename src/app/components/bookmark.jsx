import React from 'react';

const BookMark = ({ id, status, onToggleBookMark }) => {
  const getIconClasses = () => {
    let classes = 'bi bi-hand-thumbs-up';
    classes += status ? '-fill' : '';
    return classes;
  };

  return (
    <button onClick={() => onToggleBookMark(id)}>
      <i className={getIconClasses()}></i>
    </button>
  );
};

export default BookMark;
