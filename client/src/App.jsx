import React from 'react';
import Login from './pages/Login';
import HeroSection from './pages/Students/HeroSection';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Courses from './pages/Students/Courses';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:(
          <>
          <HeroSection />
          <Courses/>
          </>
        )
         ,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
