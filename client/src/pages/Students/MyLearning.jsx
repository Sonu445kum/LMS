// // import React, { useState, useEffect } from 'react';

// // import Courses from './Courses';

// // const MyLearning = () => {
// //     const isLoading = false;
// //     const myLearningCourses = [];

// //     return (
// //         <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
// //             <h1 className='font-bold text-2xl'>MY LEARNING</h1>
// //             <div className='my-5'>
// //                 {isLoading ? (
// //                     <MyLearningSkeleton />
// //                 ) : myLearningCourses.length === 0 ? (
// //                     <p>You are not Enrolled in any Courses</p>
// //                 ) : (
// //                    <div>
// //                     {myLearningCourses.map((course, index) => (
// //                         <Courses key={index} course={course} />
// //                     ))}
// //                    </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default MyLearning;

// // // Fixed MyLearningSkeleton component
// // const MyLearningSkeleton = () => {
// //     return (
// //         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
// //             {[...Array(3)].map((_, index) => (
// //                 <div
// //                     key={index}
// //                     className='bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse'
// //                 ></div>
// //             ))}
// //         </div>
// //     );
// // };


// import React from "react";
// import Course from "./Course";
// import { useLoadUserQuery } from "@/Features/Api/authApi";

// const MyLearning = () => { 
//   const {data, isLoading} = useLoadUserQuery();

//   const myLearning = data?.user.enrolledCourses || [];
//   return (
//     <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
//       <h1 className="font-bold text-2xl">MY LEARNING</h1>
//       <div className="my-5">
//         {isLoading ? (
//           <MyLearningSkeleton />
//         ) : myLearning.length === 0 ? (
//           <p>You are not enrolled in any course.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {myLearning.map((course, index) => (
//               <Course key={index} course={course}/>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyLearning;

// // Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);

import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/Features/Api/authApi";
import { Sparkles } from "lucide-react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className=" mt-20 max-w-6xl mx-auto my-12 px-4 md:px-6">
      <div className="mb-10 flex items-center gap-2">
        <Sparkles className="text-purple-500" size={28} />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          My Learning Dashboard
        </h1>
      </div>

      <div>
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-md">
            You are not enrolled in any course yet. Start learning something new today!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myLearning.map((course, index) => (
              <div
                key={index}
                className="transition-transform duration-300 hover:scale-105"
              >
                <Course course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

