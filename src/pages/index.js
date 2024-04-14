import React from 'react';

export { default as HomeLayout } from './HomeLayout';

export { default as DashboardLayout } from './DashboardLayout';
export { default as Login } from'./Login';


export const Error = React.lazy(() => import('./Error'));
export const Lobby = React.lazy(() => import('./Lobby'));
export const Order = React.lazy(() => import('./Order'));
export const Report = React.lazy(() => import('./Report'));
export const FoodAndService = React.lazy(() => import('./FoodAndService'));
export const User = React.lazy(() => import('./User'));