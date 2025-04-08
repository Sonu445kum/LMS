// import BuyCourseButton from "@/components/BuyCourseButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React from "react";

// const CourseDetail = () => {
//     const purchasedCourse = true;
//   return (
//     <div className="mt-20 space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
//           <p className="text-base md:text-lg">Course Sub-Title</p>
//           <p>
//             {" "}
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">Sonu Kumar</span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last Updated on 8/04/2025</p>
//           </div>
//           <p>Students Enrolled:10</p>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p className="text-sm">
//             This Comprehensive Course is Designed For Developers Who Want To
//             Learn How To Build robust,production-ready web applications using
//             Next.Js. You Will Master Server-Side Rendering, Static Site
//             Generation,API Routes,Dynamic Routing,And Much More. By The End of
//             This Course,You Will Be Able To Create SEO-Friendly,Scalable,And
//             Fast Web Applications With Ease. Full-Stack Web Applications Using
//             React, Node.js, Express.js, and MongoDB.
//           </p>
//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>4 Lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {Array(4)
//                 .fill(0)
//                 .map((item, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <span>
//                       {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                     </span>
//                     <p>Lecture Title</p>
//                   </div>
//                 ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Video Lecture */}
//         <div className="w-full lg:w-1/3">
//                 <Card>
//                     <CardContent>
//                         <div className="p-4 flex flex-col">
//                             <h1 className="font-bold text-lg">Lecture 1: Introduction to Next.js</h1>
//                             {/* Upload Video Lecture */}
//                         </div>
//                         <h1>Lecture Title</h1>
//                         <Separator className='my-2'/>
//                         <h1 className="text-lg md:text-xl font-semibold">Course Prices</h1>
//                     </CardContent>
//                     <CardFooter className='flex justify-between p-4'>
//                         {
//                             purchasedCourse ? (
//                                 <Button className='w-full'>Continue Course</Button>
//                             ):<BuyCourseButton/>

//                         }
                        
//                     </CardFooter>
//                 </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;

// new code 
import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetail = () => {
  const purchasedCourse = true;

  return (
    <div className="mt-20 space-y-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1f2937] to-[#111827] text-white">
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 flex flex-col gap-3">
          <h1 className="font-bold text-3xl md:text-4xl">🚀 Course Title</h1>
          <p className="text-lg md:text-xl text-gray-300">Course Sub-Title that hooks interest.</p>
          <p className="text-sm text-gray-400">
            Created By <span className="text-[#C0C4FC] underline italic">Sonu Kumar</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BadgeInfo size={16} />
            <p>Last Updated on 8/04/2025</p>
          </div>
          <p className="text-sm">👨‍🎓 Students Enrolled: <span className="font-semibold">10</span></p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div>
            <h1 className="font-bold text-2xl md:text-3xl">📝 Course Description</h1>
            <p className="text-sm md:text-base mt-2 text-gray-700 dark:text-gray-300">
              This comprehensive course is designed for developers who want to learn how to build
              robust, production-ready web applications using Next.js. You’ll master server-side
              rendering, static site generation, dynamic routing, and more. Build full-stack web
              apps using React, Node.js, Express, and MongoDB.
            </p>
          </div>

          {/* Course Content */}
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl">📚 Course Content</CardTitle>
              <CardDescription className="text-sm">4 Lectures Included</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition"
                  >
                    <span>{purchasedCourse ? <PlayCircle size={16} /> : <Lock size={16} />}</span>
                    <p className="text-sm">Lecture {index + 1} - Understanding the Basics</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 space-y-4">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-5 space-y-3">
              <h1 className="font-bold text-lg md:text-xl">
                🎥 Lecture 1: Introduction to Next.js
              </h1>

              <Separator />

              <h2 className="text-lg font-semibold">💰 Course Price</h2>
              <p className="text-xl font-bold text-green-600">₹499</p>
            </CardContent>
            <CardFooter className="flex justify-between p-5">
              {purchasedCourse ? (
                <Button className="w-full bg-green-600 hover:bg-green-700 transition">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

