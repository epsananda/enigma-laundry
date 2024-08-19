import React from 'react';

const Content = ({ children }) => {
  return (
    <div className="bg-[#eaddcf] flex-1 p-4">
      {children}
    </div>
  );
};

export default Content;