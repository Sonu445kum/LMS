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
import {useGetCourseDetailWithStatusQuery} from "@/Features/Api/purchaseApi"
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h>Failed to load course details</h>;

  const { course, purchased } = data;
  console.log(purchased);

  const handleContinueCourse = () => {
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className="mt-10 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>Lecture title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;


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
// import {
//   useGetCourseDetailWithStatusQuery,
// } from "@/Features/Api/purchaseApi";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <div className="text-center py-10 text-lg">Loading...</div>;
//   if (isError) return <div className="text-center py-10 text-red-500">Failed to load course details</div>;

//   const { course, purchased } = data;

//   const handleContinueCourse = () => {
//     if (purchased) {
//       navigate(`/course-progress/${courseId}`);
//     }
//   };

//   return (
//     <div className=" mt-10 space-y-6">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-[#1F1F1F] to-[#2D2F31] text-white shadow-md">
//         <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 space-y-2">
//           <h1 className="font-bold text-3xl md:text-4xl">
//             {course?.courseTitle}
//           </h1>
//           <p className="text-lg text-gray-300">Master your skills - Course Sub-title</p>
//           <p className="text-sm">
//             Created By{" "}
//             <span className="text-indigo-300 underline italic">
//               {course?.creator.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm text-gray-400">
//             <BadgeInfo size={16} />
//             <p>Last updated: {course?.createdAt?.split("T")[0]}</p>
//           </div>
//           <p className="text-sm">Students Enrolled: {course?.enrolledStudents?.length}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-10">
//         {/* Left Content */}
//         <div className="w-full lg:w-2/3 space-y-6">
//           <section>
//             <h2 className="font-semibold text-xl md:text-2xl mb-2">Course Description</h2>
//             <p className="text-sm text-gray-700 leading-relaxed"
//                dangerouslySetInnerHTML={{ __html: course.description }} />
//           </section>

//           {/* Course Content Card */}
//           <Card className="shadow-md transition-transform hover:scale-[1.02] duration-200">
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>{course.lectures.length} Lectures Included</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {course.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
//                   {purchased ? (
//                     <PlayCircle size={18} className="text-green-500" />
//                   ) : (
//                     <Lock size={18} className="text-gray-400" />
//                   )}
//                   <p>{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-full lg:w-1/3 sticky top-20">
//           <Card className="shadow-lg">
//             <CardContent className="p-4">
//               <div className="w-full aspect-video rounded overflow-hidden mb-4 shadow">
//                 <ReactPlayer
//                   width="100%"
//                   height="100%"
//                   url={course.lectures[0]?.videoUrl}
//                   controls
//                 />
//               </div>
//               <h3 className="font-semibold mb-2 text-lg">Preview: {course.lectures[0]?.lectureTitle}</h3>
//               <Separator className="my-3" />
//               <div className="text-xl font-bold text-indigo-600 mb-2">₹{course.coursePrice}</div>
//               {purchased ? (
//                 <Button onClick={handleContinueCourse} className="w-full">
//                   Continue Course
//                 </Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardContent>
//             <CardFooter className="text-sm text-gray-500 justify-center py-2">
//               30-Day Money Back Guarantee
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;
