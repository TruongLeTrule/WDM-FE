import React from 'react';

// Sidebar components
export const Sidebar = React.lazy(() => import('./Sidebar'));
export const Logo = React.lazy(() => import('./Logo'));
export const NavLinks = React.lazy(() => import('./NavLinks'));
export const UserRole = React.lazy(() => import('./UserRole'));

// Common components
export const Header = React.lazy(() => import('./Header'));
export const SearchBox = React.lazy(() => import('./SearchBox'));
export const Table = React.lazy(() => import('./Table'));
export const Modal = React.lazy(() => import('./Modal'));
export const DatePick = React.lazy(() => import('./DatePick'));
export const TextInput = React.lazy(() => import('./TextInput'));
export const CheckBox = React.lazy(() => import('./CheckBox'));
export const TextRow = React.lazy(() => import('./TextRow'));
export const Radio = React.lazy(() => import('./Radio'));

// Food and service components
export const FSheader = React.lazy(() => import('../components/Foodandservice/FSheader'));
export const FContent = React.lazy(() => import('../components/Foodandservice/FContent'));
export const SContent = React.lazy(() => import('../components/Foodandservice/SContent'));
