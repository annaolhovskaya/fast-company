import React from 'react';

const Qualitie = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <span className={'badge m-1 bg-' + item.color} key={item._id}>
          {item.name}
        </span>
      ))}
    </>
  );
};

export default Qualitie;
