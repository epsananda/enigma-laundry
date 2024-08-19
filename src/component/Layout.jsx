import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Content>
        {/* <p>hello world</p> */}
        {children}
      </Content>
    </div>
  );
};

export default Layout;