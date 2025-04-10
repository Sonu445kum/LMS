// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";
// import { Link } from "react-router-dom";

// const Course = ({ course }) => {
//   return (
//     <Link to={`course-details/${course._id}`}>
//     <Card className="overflow-hidden rounded-2xl dark:bg-gray-800 bg-white shadow-md hover:shadow-xl transition duration-300 ease-in-out group">
//       <div className="relative">
//         <img
//           src={course.courseThumbnail}
//           alt="course"
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 text-xs rounded-full shadow-md">
//           {course.courseLevel}
//         </Badge>
//       </div>

//       <CardContent className="px-5 py-4 space-y-3">
//         <h1 className="hover:underline text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-200 cursor-pointer">
//           {course.courseTitle}
//         </h1>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-9 w-9">
//               <AvatarImage
//                 src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
//                 alt={course.creator?.name || "Creator"}
//               />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <h1 className="font-medium text-sm text-gray-700 dark:text-gray-300">
//               {course.creator?.name}
//             </h1>
//           </div>
//         </div>

//         <div className="flex items-center justify-between pt-2">
//           <span className="text-lg font-bold text-green-600">₹{course.coursePrice}</span>
//           <button className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full transition duration-300">
//             Enroll
//           </button>
//         </div>
//       </CardContent>
//     </Card>
//     </Link>
//   );
// };

// export default Course;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({course}) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={course.courseThumbnail}
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          {course.courseTitle}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{course.creator?.name}</h1>
          </div>
          <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
            {course.courseLevel}
          </Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹{course.coursePrice}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default Course;