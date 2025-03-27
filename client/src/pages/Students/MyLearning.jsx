import React, { useState, useEffect } from 'react';

import Courses from './Courses';

const MyLearning = () => {
    const [isLoading, setIsLoading] = useState(true);
    const myLearningCourses = [1, 2]; // Simulating enrolled courses

    // Simulating loading data
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simulates data fetching delay
    }, []);

    return (
        <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
            <h1 className='font-bold text-2xl'>MY LEARNING</h1>
            <div className='my-5'>
                {isLoading ? (
                    <MyLearningSkeleton />
                ) : myLearningCourses.length === 0 ? (
                    <p>You are not Enrolled in any Courses</p>
                ) : (
                    <Courses />
                )}
            </div>
        </div>
    );
};

export default MyLearning;

// Fixed MyLearningSkeleton component
const MyLearningSkeleton = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className='bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse'
                ></div>
            ))}
        </div>
    );
};
