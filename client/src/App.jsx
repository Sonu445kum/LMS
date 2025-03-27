import React from 'react';
import Login from './pages/Login';
import HeroSection from './pages/Students/HeroSection';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Courses from './pages/Students/Courses';
import MyLearning from './pages/Students/MyLearning';
import Profile from './pages/Students/Profile';

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
      {
        path:"my-Learning",
        element:<MyLearning/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
