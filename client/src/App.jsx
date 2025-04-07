import React from 'react';
import Login from './pages/Login';
import HeroSection from './pages/Students/HeroSection';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Courses from './pages/Students/Courses';
import MyLearning from './pages/Students/MyLearning';
import Profile from './pages/Students/Profile';
import Sidebar from './pages/Admin/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import CourseTable from './pages/Admin/Course/CourseTable';
import AddCourse from './pages/Admin/Course/AddCourse';
import EditCourse from './pages/Admin/Course/EditCourse';
import CreateLecture from './pages/Admin/Lecture/CreateLecture';

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
      },
      // Admin Routes are Start From Here
      {
        path:"admin",
        element:<Sidebar/>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          }
        ]
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
