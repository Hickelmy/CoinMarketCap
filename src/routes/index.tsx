import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { APP_PAGES } from './pages.routes'
import { DefaultLayout } from '../components/layouts/DefaultLayouts';
import { NotFoundPage } from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {APP_PAGES.map(({ route, component }) => (
          <Route key={route} path={route} element={component} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
