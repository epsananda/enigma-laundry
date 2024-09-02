import React from 'react';

const Content = ({ children }) => {
  return (
    <div className=" flex-1 p-4 min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default Content;

//bg-[#eaddcf]