
// new code 
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/Features/Api/courseApi";
import { toast } from "sonner";
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

  const { courseId } = useParams();
  const navigate = useNavigate();
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    isError: courseByIdError,
    isSuccess: courseByIdSuccess,
    refetch,
  } = useGetCourseByIdQuery(courseId ,{refetchOnMountOrArgChange: true});

  // const isPublished = true;

  const course = courseByIdData?.course;

  useEffect(() => {
    if (course) {
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
      setPreviewThumbnail(course.thumbnailUrl); // Set existing thumbnail preview
    }
  }, [course]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectedCategoryHandler = (value) => {
    setInput((prev) => ({ ...prev, category: value }));
  };

  const selectedCourseLevelHandler = (value) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  const getFileHandler = (e) => {
    const file = e.target.files?.[0];
    const fileReader = new FileReader();

    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const getUpdateCourseHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);

    if (input.courseThumbnail && typeof input.courseThumbnail !== "string") {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Updated Successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Error Updating Course");
    }
  }, [isSuccess, error, data]);

  const [publishCourse,{}] = usePublishCourseMutation();
  // publish status handler
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId,query:action});
      if (response.data){
         refetch();
        toast.success(response.data.message || "Status Updated Successfully");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
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
          <Button disabled={courseByIdData?.course.isPublished.length === 0} variant="outline" onClick={()=>{publishStatusHandler(courseByIdData?.course.isPublished ? false : true)}}>
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={getUpdateCourseHandler} className="space-y-6 mt-6 px-2 md:px-4">
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
              <Select
                onValueChange={selectedCategoryHandler}
                defaultValue={input.category}
              >
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
              <Select
                onValueChange={selectedCourseLevelHandler}
                defaultValue={input.courseLevel}
              >
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
                onChange={changeEventHandler}
                placeholder="Ex. Rs.1999"
              />
            </div>
          </div>

          <div>
            <Label className="block mb-2">Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              value={undefined}
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










