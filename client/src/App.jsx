// import React from 'react';
// import Login from './pages/Login';
// import HeroSection from './pages/Students/HeroSection';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import MainLayout from './Layout/MainLayout';
// import Courses from './pages/Students/Courses';
// import MyLearning from './pages/Students/MyLearning';
// import Profile from './pages/Students/Profile';
// import Sidebar from './pages/Admin/Sidebar';
// import Dashboard from './pages/Admin/Dashboard';
// import CourseTable from './pages/Admin/Course/CourseTable';
// import AddCourse from './pages/Admin/Course/AddCourse';
// import EditCourse from './pages/Admin/Course/EditCourse';
// import CreateLecture from './pages/Admin/Lecture/CreateLecture';
// import EditLecture from './pages/Admin/Lecture/EditLecture';
// import CourseDetail from './pages/Students/CourseDetail';
// import CourseProgress from './pages/Students/CourseProgress';

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element:(
//           <>
//           <HeroSection />
//           <Courses/>
//           </>
//         )
//          ,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
      
//       {
//         path:"my-Learning",
//         element:<MyLearning/>
//       },
//       {
//         path:"profile",
//         element:<Profile/>
//       },
//       {
//         path:'course-details/:courseId',
//         element:<CourseDetail/>
//       },
//       {
//         path:'course-progress/:courseId',
//         element:<CourseProgress/>
//       },
//       // Admin Routes are Start From Here
//       {
//         path:"admin",
//         element:<Sidebar/>,
//         children:[
//           {
//             path:"dashboard",
//             element:<Dashboard/>
//           },
//           {
//             path:"course",
//             element:<CourseTable/>
//           },
//           {
//             path:"course/create",
//             element:<AddCourse/>
//           },
//           {
//             path:"course/:courseId",
//             element:<EditCourse/>
//           },
//           {
//             path:"course/:courseId/lecture",
//             element:<CreateLecture/>
//           },
//           {
//             path:"course/:courseId/lecture/:lectureId",
//             element:<EditLecture/>
//           },
//         ]
//       }
//     ],
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={appRouter} />;
// };

// export default App;


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/Students/HeroSection";
import MainLayout from "./Layout/MainLayout";
import Courses from "./pages/Students/Courses";
import MyLearning from "./pages/Students/MyLearning";
import Profile from "./pages/Students/Profile";
import Sidebar from "./pages/Admin/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import CourseTable from "./pages/Admin/Course/CourseTable";
import AddCourse from "./pages/Admin/Course/AddCourse";
import EditCourse from "./pages/Admin/Course/EditCourse";
import CreateLecture from "./pages/Admin/Lecture/CreateLecture";
import EditLecture from "./pages/Admin/Lecture/EditLecture";
import CourseDetail from "./pages/Students/CourseDetail";
import CourseProgress from "./pages/Students/CourseProgress";
import SearchPage from "./pages/Students/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
            <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
      <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
