import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'
import { Button } from '@/components/ui/button'

const EditCourse = () => {
  return (
    <div className='flex-1'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='font-bold text-xl'>Add Detail information Regarding Courses</h1>
        <Link to='lecture'>
        <Button className='hover:text-blue-700' variant='link'>Go To Lectures Page</Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  )
}

export default EditCourse
