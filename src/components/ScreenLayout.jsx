// src/components/ScreenLayout.jsx
import React, { useContext } from 'react';
import { Outlet }         from 'react-router-dom';
import { AuthContext }    from '../context/AuthContext';
import PageContainer      from './PageContainer';
import Navbar             from './Navbar';

export default function ScreenLayout() {
  const { user } = useContext(AuthContext);

  return (
    <PageContainer>
      <Outlet />
      {user && <Navbar />}
    </PageContainer>
  );
}
