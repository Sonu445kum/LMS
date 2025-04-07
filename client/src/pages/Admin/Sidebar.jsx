// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex">
//       <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen">
//         <div className="mt-20 space-y-4">
//           <Link to="dashboard" className="flex items-center gap-2">
//             <ChartNoAxesColumn size={22} />
//             <h1>Dashboard</h1>
//           </Link>
//           <Link to="course" className="flex items-center gap-2">
//             <SquareLibrary size={22} />
//             <h1>Course</h1>
//           </Link>
//         </div>
//       </div>
//       <div className="flex-1 md:p-24 p-2 bg-white">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// new code 
import { ChartBar, Library } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      icon: <ChartBar className="h-5 w-5" />,
      to: "dashboard",
    },
    {
      label: "Courses",
      icon: <Library className="h-5 w-5" />,
      to: "course",
    },
  ];

  return (
    <div className=" mt-10 flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] bg-gradient-to-br from-gray-100 to-white border-r border-gray-200 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 shadow-sm p-5">
        <div className="mt-10 space-y-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</h1>

          <nav className="space-y-3">
            {links.map((link, index) => {
              const isActive = location.pathname.includes(link.to);
              return (
                <Link
                  key={index}
                  to={link.to}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10 bg-white dark:bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;

