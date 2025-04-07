// import { Button } from "@/components/ui/button";
// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useNavigate } from "react-router-dom";
// import { useGetCreatorCourseQuery } from "@/Features/Api/courseApi";
// import { Badge, BadgeAlert, Edit } from "lucide-react";
// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];
// const CourseTable = () => {
//   const navigate = useNavigate();
//   const {data,isLoading} =useGetCreatorCourseQuery();
//   if(isLoading){
//     return <div>Loading...</div>;
//     }
//   return (
//     <div>
//       <Button onClick={() => navigate(`create`)}>Create a New Course</Button>
//       <Table>
//         <TableCaption>A list of your recent Courses.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Price</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.courses.map((course) => (
//             <TableRow key={course._id}>
//               <TableCell className="font-medium">{course?.coursePrice || "$0.00"}</TableCell>
//               <TableCell><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
//               <TableCell>{course.courseTitle}</TableCell>
//               <TableCell className="text-right">
//                 <Button size='sm' variant='ghost' onClick={() => navigate(`${course._id}`)}><Edit/></Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
        
//       </Table>
//     </div>
//   );
// };

// export default CourseTable;

// new code 
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/Features/Api/courseApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

// Sample invoice data (not used in this component but kept as per request)
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Courses</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white transition"
          onClick={() => navigate(`create`)}
        >
          + Create New Course
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <Table>
          <TableCaption className="text-gray-500 italic">
            A list of your recent courses.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[120px] font-semibold text-gray-700">
                Price
              </TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Title</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.courses?.map((course) => (
              <TableRow
                key={course._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <TableCell className="font-medium text-gray-900">
                  {course?.coursePrice || "$0.00"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={course.isPublished ? "default" : "secondary"}
                    className={`${
                      course.isPublished ? "bg-green-100 text-green-800" : "bg-black-600 text-blue-800"
                    } px-2 py-1 rounded-full text-xs font-semibold`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-800">{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-blue-50"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;

