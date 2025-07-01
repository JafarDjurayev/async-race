import React, { type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import GaragePage from '../pages/garage/GaragePage';
import WinnersPage from '../pages/winners/WinnersPage';
import Layout from '../layout/Layout';

export default function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GaragePage />} />
        <Route path="winners" element={<WinnersPage />} />
      </Route>
    </Routes>
  );
}
