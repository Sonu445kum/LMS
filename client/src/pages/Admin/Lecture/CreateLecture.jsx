import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CreateLecture = () => {
    const isCreating = false;
    const params = useParams();
    const courseId =params.courseId;
    const navigate =useNavigate();
    const [lectureTitle,setLectureTitle] =useState("");

    const createLectureHandler =()=>{
        console.log(lectureTitle);
    }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
    <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Add a New Lecture
        </h1>
        <p className="text-sm text-gray-500">
         Let's Add Lectures ,Add Some Basic Details For You New Lecture
        </p>
      </div>

      <div className="space-y-4">
        {/* Course Title Input */}
        <div className="space-y-1">
          <Label className="text-sm text-gray-700">Lecture Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter Lecture Title"
            className="w-full"
          />
        </div>

       
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/course/${courseId}`)}
          className="rounded-lg"
        >
          Back To Course
        </Button>
        <Button
          disabled={isCreating}
          onClick={createLectureHandler}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Lecture"
          )}
        </Button>
      </div>
    </div>
  </div>
  )
}

export default CreateLecture;
