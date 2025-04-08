import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import Course from "../Students/Course";
import coursesData from "../Students/CourseData"; // Import courses data
import { useGetPublishedCourseQuery } from "@/Features/Api/courseApi";

const Courses = () => {
  

  //GetPublishedCourse
  const { data,isLoading,isSuccess,error } = useGetPublishedCourseQuery();
  console.log("data", data);
  

  if(error){
    return <h1>Something went wrong</h1>
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            :data?.courses && data.courses.map((course) => <Course key={course.id} course={course} />)}
        </div>
      </div>
    </div>
  );
};

export default Courses;

// Skeleton Loader
const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};
