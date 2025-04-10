// import React, { useEffect, useState } from "react";
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
// import { Switch } from "@/components/ui/switch";
// import axios from "axios";
// import { toast } from "sonner";
// import { Progress } from "@/components/ui/progress";
// import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation} from "@/Features/Api/courseApi";
// import { useParams } from "react-router-dom";
// import { Loader2 } from "lucide-react";

// //base Url For Media
// const MEDIA_API ="http://localhost:9000/api/v1/media";
// const LectureTab = () => {
//   //state variables
//   const [lectureTitle,setLectureTitle] = useState("");
//   const [uploadVideoInfo,setUploadVideoInfo] = useState(null);
//   const [isFree,setIsFree] = useState(false);
//   const [mediaProgress,setMediaProgress] = useState(false);
//   const [uploadProgress,setUploadProgress] = useState(0);
//   const [btnDisable,setBtnDisable] = useState(true);
//   const params =useParams();
//   const {courseId,lectureId} = params;

//   //UseGetLectureByIdQuery
//   const {data:lectureData,isLoading:lectureLoading,isSuccess:lectureSuccess,error:lectureError} = useGetLectureByIdQuery(lectureId);
//   const lecture = lectureData?.lecture;
//   //useEffect for lecture data
//   useEffect(()=>{
//     if(lecture){
//       setLectureTitle(lecture.lectureTitle);
//       setUploadVideoInfo(lecture.videoInfo);
//       setIsFree(lecture.isPreviewFree);
//     }
//   },[lecture]);
//   //UseEditLectureMutation
//   const [editLecture,{data,isLoading,error,isSuccess}] = useEditLectureMutation();

//   //UseRemoveLectureQuery
//   const [removeLecture,{ data:removeData,isLoading:removeLoading,isSuccess:removeSuccess,error:removeError}] = useRemoveLectureMutation();

//   //remove lecture handler
//   const removeLectureHandler = async()=>{
//     await removeLecture(lectureId);
//   }
//   //useEffect for remove lecture
//   useEffect(()=>{
//     if(removeSuccess){
//       toast.success(removeData?.message || "Lecture Removed Successfully");
//     }
//     if(removeError){
//       toast.error(removeError.message || "Error Removing Lecture");
//     }
//   },[removeSuccess,removeError]);

//   //edit lecture handler
//   const editLectureHandler = async()=>{
//    await editLecture({
//     lectureTitle,
//     videoInfo:uploadVideoInfo,
//     isPreviewFree:isFree,
//     courseId,
//     lectureId
//   });
//   };

//   //useEffect
//   useEffect(()=>{
//     if(isSuccess){
//       toast.success(data?.message || "Lecture Updated Successfully");
//     }
//     if(error){
//       toast.error(error.message || "Error Updating Lecture");
//     }
//   },[isSuccess,error]);

//   //handler file change
//   const fileChangeHandler = async(e)=>{
//     const file = e.target.files[0];
//     if(file){
//       const formData = new FormData();
//       formData.append("file", file);
//       setMediaProgress(true);
//       try {
//         const res =await axios.post(`${MEDIA_API}/upload-video`, formData, {
//           onUploadProgress:({loaded,total})=>{
//             setUploadProgress(Math.round((loaded*100)/total));
//           }
//         });
//         if(res.data.success){
//           console.log(res);
//           setUploadVideoInfo({
//             videoUrl:res.data.data.url,
//             publicId:res.data.data.public_id
//           });
//           setBtnDisable(false);
//           toast.success(res.data.message ||  "Video Upload Success");
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error(error.res.data.message || "Something went wrong");
//       }finally{
//         setMediaProgress(false);
//       }
//     }
//   }
//   return (
//     <Card className="shadow-lg">
//       <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <CardTitle className="text-2xl font-semibold">Edit Lecture</CardTitle>
//           <CardDescription className="text-sm text-muted-foreground">
//             Here you can edit the lecture details.
//           </CardDescription>
//         </div>
//         <Button disable={removeLoading} onClick={removeLectureHandler} variant="destructive">
//           {
//             removeLoading ? <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//             Please Wait
//             </> : "Remove Lecture"
//           }
//         </Button>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="lectureTitle" className="text-base font-medium">
//             Title
//           </Label>
//           <Input
//             id="lectureTitle"
//             type="text"
//             value={lectureTitle}
//             onChange={(e)=>setLectureTitle(e.target.value)}
//             placeholder="Enter Lecture Title"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="lectureVideo" className="text-base font-medium">
//             Video <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="lectureVideo"
//             type="file"
//             accept="video/*"
//             onChange={fileChangeHandler}
//             className="w-fit"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Switch 
//           checked={isFree}
//           onCheckedChange={(e)=>setIsFree(e)}
//           id="airplane-mode" />
//           <Label htmlFor="airplane-mode">Is This Video Free</Label>
//         </div>
//         {/* MediaProgress */}
//         {
//           mediaProgress && (
//             <div>
//               <Progress value={uploadProgress}/>
//               <p>{uploadProgress} % Uploaded</p>
//             </div>
//           )
//         }
//         <div className="mt-4">
//           <Button disable={isLoading} onClick={editLectureHandler}>
//           {
//             isLoading ? <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//             Please Wait
//             </> : "Update Lecture"
//           }
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default LectureTab;

// new code

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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/Features/Api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:9000/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const {data:lectureData} = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(()=>{
    if(lecture){
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo)
    }
  },[lecture])

  const [edtiLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
    const [removeLecture,{data:removeData, isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    console.log({ lectureTitle, uploadVideInfo, isFree, courseId, lectureId });

    await edtiLecture({
      lectureTitle,
      videoInfo:uploadVideInfo,
      isPreviewFree:isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(()=>{
    if(removeSuccess){
      toast.success(removeData.message);
    }
  },[removeSuccess])

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disbaled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
            {
              removeLoading ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please wait
              </> : "Remove Lecture"
            }
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button disabled={isLoading} onClick={editLectureHandler}>
              {
                isLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
                </> : "Update Lecture"
              }
            
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
