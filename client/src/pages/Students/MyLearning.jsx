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
import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/Features/Api/authApi";

const MyLearning = () => { 
  const {data, isLoading} = useLoadUserQuery();

  const myLearning = data?.user.enrolledCourses || [];
  return (
    <div className="mt-20 max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Course key={index} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
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

