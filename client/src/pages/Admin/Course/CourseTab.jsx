// import RichTextEditor from "@/components/RichTextEditor";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// const CourseTab = () => {
//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });

//   const [previewThumbnail, setPreviewThumbnail] = useState('');

//   //changeEventHandler
//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   // selectedCategoryHandler
//   const selectedCategoryHandler = (e) => {
//     setInput({ ...input, category:value });
//   }

//   // selectedCourseLevelHandler
//   const selectedCourseLevelHandler = (e) => {
//     setInput({ ...input, courseLevel: value });
//   }

//   // getFileHandler
//   const getFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     const fileReader = new FileReader();

//     if (file) {
//         setInput({ ...input, courseThumbnail: file });
//         fileReader.readAsDataURL(file);
//         fileReader.onloadend = () => {
//             setPreviewThumbnail(fileReader.result);
//             fileReader.readAsDataURL(file);
//         }

//     }
// }

// //getUpdateCourseHandler
// const getUpdateCourseHandler = (e) => {
//     e.preventDefault();
//     console.log(input);
// }
//   const navigate = useNavigate();
//   const isPublished = true;
//   const isLoading = false;
//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between">
//         <div>
//           <CardTitle>
//             <CardDescription>
//               Make Changes To Your Courses Here.Click Save When You're Done
//             </CardDescription>
//           </CardTitle>
//         </div>
//         <div className="space-x-2">
//           <Button variant="outline">
//             {isPublished ? "Unpublish" : "Publish"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       {/* CardContent */}
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <Label>Title</Label>
//           <Input
//             type="text"
//             name="courseTitle"
//             value={input.courseTitle}
//             onChange={changeEventHandler}
//             placeholder="Ex.Full Stack Web Development"
//           />
//         </div>
//         <div className="space-y-4 mt-5">
//           <Label>SubTitle</Label>
//           <Input
//             type="text"
//             name="SubTitle"
//             value={input.subTitle}
//             onChange={changeEventHandler}
//             placeholder="Ex. Become a Full Stack Web Developer"
//           />
//         </div>
//         <div className="space-y-4 mt-5">
//           <Label>Description</Label>
//           <RichTextEditor input={input} setInput={setInput} />
//         </div>
//         <div className=" flex flex-row gap-3 space-y-4 mt-5">
//           <div>
//             <Label>Category</Label>
//             <Select onClick={selectedCategoryHandler}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a Course" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Course</SelectLabel>
//                   <SelectItem value="React js">React js</SelectItem>
//                   <SelectItem value="Next Js">Next Js</SelectItem>
//                   <SelectItem value="Data Science">Data Science</SelectItem>
//                   <SelectItem value="Frontend Development">
//                     Frontend Development
//                   </SelectItem>
//                   <SelectItem value="Full Stack Development">
//                     Full Stack Development
//                   </SelectItem>
//                   <SelectItem value="MERN Stack Development">
//                     MERN Stack Development
//                   </SelectItem>
//                   <SelectItem value="Full Stack Development">
//                     Javascript
//                   </SelectItem>
//                   <SelectItem value="Full Stack Development">Python</SelectItem>
//                   <SelectItem value="Full Stack Development">Docker</SelectItem>
//                   <SelectItem value="Full Stack Development">Nodejs</SelectItem>
//                   <SelectItem value="Full Stack Development">
//                     MongoDb
//                   </SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <Label>Course Level</Label>
//             <Select onClick={selectedCourseLevelHandler}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a Course" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Course</SelectLabel>
//                   <SelectItem value="Beginners">Beginners</SelectItem>
//                   <SelectItem value="Intermediate">Intermediate</SelectItem>
//                   <SelectItem value="Advance">Advance</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Price in (INR)</Label>
//             <Input 
//             type='number'
//             name="coursePrice"
//             value={input.coursePrice}
//             placeholder="Ex. Rs.1999"
//             onChange={changeEventHandler} 
//             className='w-fit'
//             />
//           </div>
          
//         </div>
//         <div>
//             <Label>Course Thumbnail</Label>
//             <Input
//             type='file'
//             accept='image/*'
//             onChange={getFileHandler}
//             className='w-fit'
//             />
//             {
//                 previewThumbnail && (
//                     <img src={previewThumbnail} alt="Thumbnail" className="w-[100px] h-[100px] object-cover" />
//                 )
//             }
//           </div>
//           <div>
//             <Button 
//             onClick={() => navigate("/admin/course")}
//             variant='outline'>Cancel</Button>
//             <Button disabled={isLoading} onClick={getUpdateCourseHandler}>
//                 {
//                     isLoading ? (
//                         <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//                         Please Wait
//                         </>
//                     ):(
//                         "Save"
//                     )
//                 }
//             </Button>
//           </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;


// new code 
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const isPublished = true;
  const isLoading = false;

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectedCategoryHandler = (value) => {
    setInput({ ...input, category: value });
  };

  const selectedCourseLevelHandler = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const getFileHandler = (e) => {
    const file = e.target.files?.[0];
    const fileReader = new FileReader();

    if (file) {
      setInput({ ...input, courseThumbnail: file });
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const getUpdateCourseHandler = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <Card className="shadow-xl rounded-2xl">
      <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-semibold">Course Details</CardTitle>
          <CardDescription className="text-sm mt-1">
            Update your course details and click save when you're done.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={getUpdateCourseHandler}
          className="space-y-6 mt-6 px-2 md:px-4"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="block mb-1">Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={changeEventHandler}
                placeholder="Ex. Full Stack Web Development"
              />
            </div>

            <div>
              <Label className="block mb-1">SubTitle</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="Ex. Become a Full Stack Web Developer"
              />
            </div>
          </div>

          <div>
            <Label className="block mb-2">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label className="block mb-1">Category</Label>
              <Select onValueChange={selectedCategoryHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courses</SelectLabel>
                    {[
                      "React js",
                      "Next Js",
                      "Data Science",
                      "Frontend Development",
                      "Full Stack Development",
                      "MERN Stack Development",
                      "Javascript",
                      "Python",
                      "Docker",
                      "Nodejs",
                      "MongoDb",
                    ].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block mb-1">Course Level</Label>
              <Select onValueChange={selectedCourseLevelHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>
                    <SelectItem value="Beginners">Beginners</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block mb-1">Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                placeholder="Ex. Rs.1999"
                onChange={changeEventHandler}
              />
            </div>
          </div>

          <div>
            <Label className="block mb-2">Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={getFileHandler}
              className="w-full"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail"
                className="w-[120px] h-[120px] rounded-md object-cover mt-3 border shadow"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              type="button"
              onClick={() => navigate("/admin/course")}
              variant="outline"
              className="w-full md:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseTab;


