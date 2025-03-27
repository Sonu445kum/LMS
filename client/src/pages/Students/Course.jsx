import { Badge } from "@/components/ui/badge";
import React from "react";

const Course = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={course.imageUrl} alt={course.title} className="rounded-md w-full h-48 object-cover" />
      <h3 className="font-bold text-lg mt-2">{course.title}</h3>
      <p className="text-gray-500">{course.instructor}</p>
      <p className="text-green-600 font-semibold">{course.price}</p>
      <Badge>
        {course.level}
      </Badge>
    </div>
  );
};

export default Course;
