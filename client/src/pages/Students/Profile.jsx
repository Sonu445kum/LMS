// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@radix-ui/react-dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";
// import Courses from "./Courses";
// const Profile = () => {
//     const isLoading = false;
//     const enrolledCourses =[1,2,3];
//   return (
//     <div className=" max-w-4xl mx-auto px-4 my-24">
//       <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className='h-24 w-24 md:h-32 md:w-32 mb-4'>
//             <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//             <div className="mb-2">
//                 <h1 className="font-semibold text-gray-900 dark:text-gray-300">
//                     Name:
//                     <span className="font-normal text-gray-700 dark:text-gary-300 ml-2">Sonu Kumar</span>
//                 </h1>
//             </div>
//             <div className="mb-2">
//                 <h1 className="font-semibold text-gray-900 dark:text-gray-300">
//                     Email:
//                     <span className="font-normal text-gray-700 dark:text-gary-300 ml-2">sonuroy1629@gmail.com</span>
//                 </h1>
//             </div>
//             <div className="mb-2">
//                 <h1 className="font-semibold text-gray-900 dark:text-gray-300">
//                     Role:
//                     <span className="font-normal text-gray-700 dark:text-gary-300 ml-2">Instructor</span>
//                 </h1>
//             </div>
//             {/* Dialog */}
//             <Dialog>
//                 <DialogTrigger asChild>
//                 <Button size="sm" className='mt-2'>Edit Profile</Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                    <DialogHeader>
//                     <DialogTitle>
//                         Edit Profile
//                     </DialogTitle>
//                     <DialogDescription>
//                         Make Change To Your Profile Here.Click Save When You're Done.
//                     </DialogDescription>
//                     </DialogHeader> 
//                     <div className="grid gap-4 py-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label>Name</Label>
//                             <Input type='text' placeholder='Name'
//                             className='col-span-3'
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label>Profile Photo</Label>
//                             <Input type='file' placeholder='Upload' accept='image/*'
//                             className='col-span-3'
//                             />
//                         </div>
//                     </div>
//                     <DialogFooter>
//                         <Button disable={isLoading}>
//                             {
//                                 isLoading ? (
//                                     <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
//                                     </>
//                                 ) :(
//                                     "Save Change"
//                                 )
//                             }
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//       </div>
//       <div className="font-medium text-lg">
//         <h1 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">Courses You're Enrolled</h1>
//         {
//             enrolledCourses.length === 0 ? <h1>You Haven't Enrolled Yet</h1>
//             :(
//                 enrolledCourses.map((course, index) => <Courses key={index}/>)
//             )
//         }
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import coursesData from "../Students/CourseData"; // Import courses data
import Course from "../Students/Course"; // Import single course component
import { useLoadUserQuery } from "../../Features/Api/authApi";


const Profile = () => {
    const {data,isLoading} = useLoadUserQuery();
    console.log("userData",data);
    const enrolledCourses = [1, 2, 3]; // Simulating enrolled course IDs

    // Filter enrolled courses from all available courses
    const enrolledCourseData = coursesData.filter(course => enrolledCourses.includes(course.id));

    const userData =data?.user;
    return (
        <div className="max-w-4xl mx-auto px-4 my-24">
            <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
                <div className="flex flex-col items-center">
                    <Avatar className='h-24 w-24 md:h-32 md:w-32 mb-4'>
                        <AvatarImage src={userData?.photoUrl||"https://github.com/shadcn.png"} alt={userData?.name} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                            Name:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">{userData?.name}</span>
                        </h1>
                    </div>
                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                            Email:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">{userData?.email}</span>
                        </h1>
                    </div>
                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-300">
                            Role:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">{userData?.role}</span>
                        </h1>
                    </div>
                    {/* Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className='mt-2'>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click Save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Name</Label>
                                    <Input type='text' placeholder='Name' className='col-span-3' />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Profile Photo</Label>
                                    <Input type='file' placeholder='Upload' accept='image/*' className='col-span-3' />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="font-medium text-lg">
                <h1 className="my-5">Courses You're Enrolled In</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {enrolledCourseData.length === 0 ? (
                        <h1>You Haven't Enrolled Yet</h1>
                    ) : (
                        enrolledCourseData.map(course => (
                            <Course key={course.id} course={course} /> // Pass filtered course data
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;


