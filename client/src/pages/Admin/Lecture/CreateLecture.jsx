// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/Features/Api/courseApi';
// import { Loader2 } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'sonner';
// import Lecture from './Lecture';

// const CreateLecture = () => {
   
//     const params = useParams();
//     const courseId =params.courseId;
//     const navigate =useNavigate();
//     const [lectureTitle,setLectureTitle] =useState("");

//     const [createLecture,{data,isCreating, isSuccess,error}] = useCreateLectureMutation();

//     const {data:lectureData,isLoading:lectureLoading,isError:lectureError,refetch} = useGetCourseLectureQuery(courseId);
//     console.log("lectureData",lectureTitle);
//     const createLectureHandler = async()=>{
//         console.log(lectureTitle);
//         await createLecture({lectureTitle,courseId});

//     }
//     //useEffect
//     useEffect(()=>{
//        if(isSuccess){
//         refetch();
//         toast.success(data?.message || "Lecture Created Successfully!")
//        }
//        if(error){
//         toast.error(error.data?.message || "Error Creating Lecture")
//        }
//     },[isSuccess,error]);
//   return (
//     <div className="max-w-3xl mx-auto py-8 px-4">
//     <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">
//       <div>
//         <h1 className="text-2xl font-semibold text-gray-800 mb-1">
//           Add a New Lecture
//         </h1>
//         <p className="text-sm text-gray-500">
//          Let's Add Lectures ,Add Some Basic Details For You New Lecture
//         </p>
//       </div>

//       <div className="space-y-4">
//         {/* Course Title Input */}
//         <div className="space-y-1">
//           <Label className="text-sm text-gray-700">Lecture Title</Label>
//           <Input
//             type="text"
//             name="courseTitle"
//             value={lectureTitle}
//             onChange={(e) => setLectureTitle(e.target.value)}
//             placeholder="Enter Lecture Title"
//             className="w-full"
//           />
//         </div>

       
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-between pt-4">
//         <Button
//           variant="outline"
//           onClick={() => navigate(`/admin/course/${courseId}`)}
//           className="rounded-lg"
//         >
//           Back To Course
//         </Button>
//         <Button
//           disabled={isCreating}
//           onClick={createLectureHandler}
//           className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           {isCreating ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Creating...
//             </>
//           ) : (
//             "Create Lecture"
//           )}
//         </Button>
//       </div>
//       {/* Display The Course Lecture */}
//       <div className='mt-10'>
//         {
//          lectureLoading ? (
//             <p>Loading Lectures...!!</p>
//          ) :lectureError ? (
//             <p>Failed to Load Lectures</p>
//          )  :lectureData.lectures.length === 0 ? (
//             <p>No Lectures Found</p>
//          ) :(
//             lectureData.lectures.map((lecture,index)=>(
//             <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}/>
//             ))
//          )
         
//         }

//       </div>
//     </div>
//   </div>
//   )
// }

// export default CreateLecture;

// new code 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/Features/Api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
      setLectureTitle(""); // Clear input after creation
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 px-6 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🎓 Add New Lecture
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Provide the basic details of your lecture to add it to this course.
        </p>
      </div>

      {/* Lecture Form */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <Label className="text-gray-700">Lecture Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter your lecture title"
            className="mt-1 focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            ← Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>

      {/* Lecture List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">📚 Lectures</h2>
        {lectureLoading ? (
          <p className="text-gray-500">Loading lectures...</p>
        ) : lectureError ? (
          <p className="text-red-500">Failed to load lectures.</p>
        ) : lectureData.lectures.length === 0 ? (
          <p className="text-gray-500 italic">No lectures available yet.</p>
        ) : (
          <div className="space-y-4">
            {lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLecture;

