import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/Features/Api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  //state variable for login and signup
  const [signupInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  //useRegisterUserMutation And useLoginUserMutation
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
    },
  ] = useLoginUserMutation();
  //function for changeInputHandler
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    //if type is signup then signupInput else loginInput
    if (type === "signup") {
      setSignUpInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  //function for submitHandler
  const submitHandler = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log("Submitting:", inputData);  // ✅ Log request payload

    const action = type === "signup" ? registerUser : loginUser;
    try {
        const response = await action(inputData);
        console.log("API Response:", response);  // ✅ Log response from API
    } catch (error) {
        console.log("API Error:", error);  // ✅ Log error details
    }
};


  // display toast
  useEffect(() => {
    if (registerSuccess && registerData) {
        toast.success(registerData.message || "SignUp Successfully");
    }
    if (registerError) {
        toast.error(registerError?.data?.message || "SignUp Failed"); 
    }
    if (loginSuccess && loginData) {
        toast.success(loginData.message || "Login Successfully");
    }
    if (loginError) {
        toast.error(loginError?.data?.message || "Login Failed"); 
    }
}, [loginLoading, registerLoading, loginData, registerData, loginError, registerError]);

  return (
    <div className="flex items-center justify-center mt-25">
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
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter Your Name"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter Your Email"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter Your Password"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerLoading}
               onClick={() => submitHandler("signup")}>
                {registerLoading ? (
                    <>
                    <Loader2 className="animate-spin"/> Please Wait
                    </>
                ) : "Signup"}
               </Button>
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
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Enter Your Password"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginLoading}
               onClick={() => submitHandler("login")}>
                {loginLoading ? ( <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                </>
                ) : "Login"}
                
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
