import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const LazyRecipes = React.lazy(() => import('../pages/recipes'));
const LazyRecipe = React.lazy(() => import('../pages/recipe'));
const LazyNotFound = React.lazy(() => import('../pages/notFound'));
const LazyMain = React.lazy(() => import('../pages/main'));
const LazyAuth = React.lazy(() => import('../pages/auth/Auth'));
const LazyProfile = React.lazy(() => import('../pages/profile/Profile'));

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<LazyMain />} />
      <Route
        path="/recipes"
        element={
          <PrivateRoute>
            <LazyRecipes />
          </PrivateRoute>
        }
      />

      <Route
        path="/recipes/:id"
        element={
          <PrivateRoute>
            <LazyRecipe />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <LazyProfile />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LazyAuth />} />
      <Route path="/register" element={<LazyAuth />} />
      <Route path="*" element={<LazyNotFound />} />
    </ReactRoutes>
  );
};

export default Routes;
