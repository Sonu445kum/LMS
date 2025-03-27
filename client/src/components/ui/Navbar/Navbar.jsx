// import { Menu, School } from "lucide-react";
// import React from "react";
// import { Button } from "../button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import DarkMode from "../DarkMode/DarkMode";
// import { Separator } from "@radix-ui/react-dropdown-menu";
// const Navbar = () => {
//   const user = false;
 
//   return (
//     <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
//       {/* Desktop */}
//       <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
//         <div className="flex items-center gap-2">
//           <School size={"30"} />
//           <h1 className="hidden md:block font-extraBold text-2xl">
//             LearnLofts
//           </h1>
//         </div>
//         {/* User icons and dark mode icon */}
//         <div className="flex items-center gap-8">
//           {user ? (
//             // dropdown
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Avatar>
//                   <AvatarImage
//                     src="https://github.com/shadcn.png"
//                     alt="@shadcn"
//                   />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   <DropdownMenuItem>My Learning</DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>Edit Profile</DropdownMenuItem>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Log out</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Dashboard</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Button variant="outline">Login</Button>
//               <Button>Signup</Button>
//             </div>
//           )}
//           {/* Add Dark Mode Button */}
//           <DarkMode />
//         </div>
//       </div>

//       {/* Mobile */}
//       <div className="flex md:hidden items-center justify-between px-4 h-full">
//         <h1 className="font-extraBold text-2xl">LearnLofts</h1>
//         <MobileNavbar />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // Mobile Navbar
// const MobileNavbar = () => {
//     const role = "instructor";
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           size="icon"
//           className="rounded-full bg-gray-200 hover:bg-gray-200"
//           variant="outline"
//         >
//           <Menu />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="flex flex-row">
//         <SheetHeader className="flex flex-row items-center justify-between mt-2">
//           <SheetTitle>LearnLofts</SheetTitle>
//           <DarkMode />
//         </SheetHeader>
//         <Separator className="mr-2" />
//         {/* Nav Link */}
//         <nav className="flex flex-col space-y-4">
//           <span>My Learning</span>
//           <span>Edit Profile</span>
//           <p>Log Out</p>
//         </nav>
//         {
//           // Add Role
//           role === "instructor" && (
//             <SheetFooter>
//               <SheetClose asChild>
//                 <Button type="submit">Dashboard</Button>
//               </SheetClose>
//             </SheetFooter>
//           )
//         }
//       </SheetContent>
//     </Sheet>
//   );
// };


// new code 
import { Menu, School } from "lucide-react";
import React from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "../DarkMode/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const user = false;

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-gray-800 border-gray-200 fixed top-0 left-0 right-0 z-10">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className="font-extrabold text-2xl">LearnLofts</h1>
        </div>

        {/* User Icons & Dark Mode */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center gap-4">
          <DarkMode />
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// Mobile Navbar
const MobileNavbar = () => {
  const role = "instructor";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-300" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 flex flex-col p-4">
        <SheetHeader className="flex flex-col items-start">
          <SheetTitle className="text-xl font-bold">LearnLofts</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-4 text-lg">
          <span className="cursor-pointer">My Learning</span>
          <span className="cursor-pointer">Edit Profile</span>
          <span className="cursor-pointer text-red-500">Log Out</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button className="w-full">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

