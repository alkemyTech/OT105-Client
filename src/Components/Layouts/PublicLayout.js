import React from 'react';
import { Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header_Wed from '../Header/Header_Wed';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header_Wed isLogged={localStorage.getItem('token')} />

      <div style={{ minHeight: '58vh' }}>
        <Switch>{children}</Switch>
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
