import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/Input"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"
export const Signin = () => {
  const navigate=useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });
      
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found. Please check your credentials.");
      } else {
        setErrorMessage("An error occurred while signing in. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={e => setUsername(e.target.value)}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={e => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="pt-4">
            <Button onPress={handleSignIn} label={"Sign in"} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
}
