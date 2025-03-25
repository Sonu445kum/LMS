import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login =()=> {
    //state variable for login and signup
    const [signupInput,setSignUpInput] =useState({name:"",email:"",password:""});
    const [loginInput,setLoginInput] =useState({email:"",password:""});

    //function for changeInputHandler
    const changeInputHandler=(e,type)=>{
        const {name,value} =e.target;

        //if type is signup then signupInput else loginInput
        if(type === "signup"){
            setSignUpInput({...signupInput,[name]:value});
        }else{
            setLoginInput({...loginInput,[name]:value});
        }
        
    };

    //function for submitHandler
    const submitHandler=(type)=>{
        //if the user is signup then signupInput else loginInput
        const inputData = type==="signup" ? signupInput : loginInput;
        console.log(inputData);
    }
  return (
   <div className="flex items-center justify-center">
     <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Signup">Signup</TabsTrigger>
        <TabsTrigger value="Login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="Signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a New Account And Click Signup When You're Done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input type='text'
              name='name'
              value={signupInput.name}
              onChange={(e)=>changeInputHandler(e,"signup")}
               placeholder='Enter Your Name'
                required={true} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type='email'
              name='email'
              value={signupInput.email}
              onChange={(e)=>changeInputHandler(e,"signup")}
               placeholder='Enter Your Email'
                required={true} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
               type='password'
               name='password'
               value={signupInput.password}
               onChange={(e)=>changeInputHandler(e,"signup")}
               placeholder='Enter Your Password'
                required={true} 
                />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>submitHandler("signup")}>Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
             Login Your Password Here.After Signup,You'll Be Logged In.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
              type='email'
              name='email'
              value={loginInput.email}
              onChange={(e)=>changeInputHandler(e,"login")}
               placeholder='Enter Your Email' 
               />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input 
              type="password"
              name='password'
              value={loginInput.password}
              onChange={(e)=>changeInputHandler(e,"login")}
               placeholder='Enter Your Password'
               required={true}
                 />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>submitHandler("login")}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
   </div>
  )
}

export default Login;
