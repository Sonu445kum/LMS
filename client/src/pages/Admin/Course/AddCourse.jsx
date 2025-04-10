// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { useCreateCourseMutation } from "@/Features/Api/courseApi";
// import { toast } from "sonner";
// const AddCourse = () => {
    
//     const [courseTitle,setCourseTitle] = useState("");
//     const [category,setCategory] = useState("");
//     const [createCourse,{data,isLoading:isCreating,error,isSuccess}] = useCreateCourseMutation();
//     const navigate =useNavigate();
//     const isLoading =false;

//     const getSelectedCategory =(value)=>{
//         setCategory(value);
//     }
//     const createCourseHandler = async()=>{
//         await createCourse({courseTitle,category});
//         // if(isSuccess){
//         //     navigate("/admin/courses");
//         // }
//     };
//     //useEffect
//     useEffect(()=>{
//         if(isSuccess){
//             toast.success(data?.message || "Course Created Successfully");
//             navigate("/admin/course");
//         }
//     },[isSuccess,error,data]);
   
//   return (
//     <div className="flex-1 mx-10">
//       <div className="mb-4">
//         <h1>
//           Lets Add Course,Add Some Basic course details for Your New Course
//         </h1>
//         <p className="text-sm">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus neque
//           aut, ab alias at architecto sunt error asperiores ex modi.
//         </p>
//       </div>
//       <div className="space-y-4">
//         <div>
//           <Label>Title</Label>
//           <Input
//             type="text"
//             name="courseTitle"
//             value={courseTitle}
//             onChange={(e) => setCourseTitle(e.target.value)}
//             placeholder="Enter Course Title"
//           />
//         </div>
//         <div>
//           <Label>Category</Label>
//           <Select onValueChange={getSelectedCategory}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select a Course" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Course</SelectLabel>
//                 <SelectItem value="React js">React js</SelectItem>
//                 <SelectItem value="Next Js">Next Js</SelectItem>
//                 <SelectItem value="Data Science">Data Science</SelectItem>
//                 <SelectItem value="Frontend Development">
//                   Frontend Development
//                 </SelectItem>
//                 <SelectItem value="Full Stack Development">
//                   Full Stack Development
//                 </SelectItem>
//                 <SelectItem value="MERN Stack Development">
//                   MERN Stack Development
//                 </SelectItem>
//                 <SelectItem value="Full Stack Development">
//                   Javascript
//                 </SelectItem>
//                 <SelectItem value="Full Stack Development">Python</SelectItem>
//                 <SelectItem value="Full Stack Development">Docker</SelectItem>
//                 <SelectItem value="Full Stack Development">Nodejs</SelectItem>
//                 <SelectItem value="Full Stack Development">MongoDb</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//         {/* Back And Create Button */}
//         <div className="flex items-center gsp-2">
//             <Button variant='outline' onClick={()=>navigate('/admin/course')}>Back</Button>
//             <Button disabled ={isLoading} onClick ={createCourseHandler}>
//                 {
//                     isLoading ? (
//                         <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//                         Please Wait
//                         </>
//                     ): 'Create Course'
//                 }
//             </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;

// new code 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/Features/Api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const getSelectedCategory = (value) => setCategory(value);

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-white px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6 transition-all duration-300">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🚀 Create a New Course</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill out the course title and category to get started.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Course Title */}
          <div className="grid gap-2">
            <Label className="text-base font-medium">Course Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Mastering Kubernetes"
              className="transition-all focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Select */}
          <div className="grid gap-2">
            <Label className="text-base font-medium">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Categories</SelectLabel>
                  {[
                    "Next JS",
                    "Data Science",
                    "Frontend Development",
                    "Fullstack Development",
                    "MERN Stack Development",
                    "Javascript",
                    "Python",
                    "Docker",
                    "MongoDB",
                    "HTML",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="transition-all hover:bg-gray-100"
              onClick={() => navigate("/admin/course")}
            >
              ⬅️ Back
            </Button>
            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;


