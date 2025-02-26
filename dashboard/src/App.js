import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Info from './components/Info';
import About from './components/About';
import Explore from './components/Explore';
import CrimeAnalysis from './components/CrimeAnalysis';
import CrimeSummarization from './components/CrimeSummarization';
import Navbar from './components/Navbar';

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Info /> },
      { path: 'about', element: <About /> },
      { path: 'explore', element: <Explore /> },
      { path: 'crimeAnalysis', element: <CrimeAnalysis /> },
      { path: 'crimeSummarization', element: <CrimeSummarization /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
