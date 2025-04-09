// import { Card, CardHeader, CardTitle } from '@/components/ui/card'
// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
//       <Card>
//         <CardHeader>
//             <CardTitle>Total Sales</CardTitle>
//         </CardHeader>
//       </Card>
//     </div>
//   )
// }

// export default Dashboard

// new code 

// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DollarSign, TrendingUp } from "lucide-react";

// const Dashboard = () => {
//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
//       <Card className="bg-gradient-to-br from-blue-100 via-white to-purple-100 shadow-md hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600">
//             Total Sales
//           </CardTitle>
//           <DollarSign className="h-6 w-6 text-green-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-gray-800">$24,000</div>
//           <p className="text-xs text-muted-foreground flex items-center gap-1 text-green-600">
//             <TrendingUp className="h-4 w-4" /> 12% from last month
//           </p>
//         </CardContent>
//       </Card>

//       {/* Duplicate card with different content */}
//       <Card className="bg-gradient-to-br from-yellow-100 via-white to-pink-100 shadow-md hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600">
//             Active Users
//           </CardTitle>
//           <svg
//             className="h-6 w-6 text-indigo-500"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             viewBox="0 0 24 24"
//           >
//             <path d="M12 14c1.66 0 3-1.34 3-3S13.66 8 12 8s-3 1.34-3 3 1.34 3 3 3z" />
//             <path d="M2 20h20v-2c0-2.21-3.58-4-8-4s-8 1.79-8 4v2z" />
//           </svg>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-gray-800">1,240</div>
//           <p className="text-xs text-muted-foreground text-blue-600">
//             +300 new users
//           </p>
//         </CardContent>
//       </Card>

//       {/* You can keep adding more cards with the same pattern */}
//     </div>
//   );
// };

// export default Dashboard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/Features/Api/purchaseApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1 className="text-red-500">Failed to get purchased course</h1>;

  // Safe destructure
  const purchasedCourse = data?.purchasedCourse || [];

  // Build course data for chart, safely
  const courseData = purchasedCourse.map((course) => ({
    name: course?.courseId?.courseTitle || "Untitled",
    price: course?.courseId?.coursePrice || 0,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element?.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
        </CardContent>
      </Card>

      {/* Course Prices Chart */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

