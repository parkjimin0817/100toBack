import React from 'react';

const data = [{ board: '1' }, { board: '1' }, { board: '1' }];

const RecentBoard = () => {
  return (
    <>
      {data.map((item, index) => (
        <div></div>
      ))}
    </>
  );
};

export default RecentBoard;
