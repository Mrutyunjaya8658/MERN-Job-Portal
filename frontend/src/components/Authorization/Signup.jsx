import React, { useState } from "react";
import Navbar from "../sharable/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/context";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const{loading} = useSelector(store => store.auth);
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input,setInput] = useState({
        fullname:"",
        email: "",
        phoneNumber:"",
        password: "",
        role:"",
        file:""

      })
    
      const onChangeHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
      }

      const changeFileHandler = (e) => {
        setInput({...input,file:e.target.files?.[0]});
      }

      const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file",input.file);
        }
        try {
          dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{"Content-Type":"multipart/form-data"},
                withCredentials:true
            })
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            
        } finally{
          dispatch(setLoading(false));

        }
        
      }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler}
          action=""
          className="w-1/2 border border-gray-200 rounded-sm p-5 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" value={input.fullname} name="fullname" onChange={onChangeHandler} placeholder="Enter Name" />
          </div>
          <div className="my-2">
            <Label>Enter Email</Label>
            <Input type="email"  value={input.email} name="email" onChange={onChangeHandler} placeholder="e.g:xyz@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Enter Phone Number</Label>
            <Input type="number"  value={input.phoneNumber} name="phoneNumber" onChange={onChangeHandler} placeholder="Enter Phone Number" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"  value={input.password} name="password" onChange={onChangeHandler} placeholder="keep a Strong password" />
          </div>
          <div className="flex items-center justify-between ">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-3 my-3"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={onChangeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={onChangeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="images/*" onChange={changeFileHandler} type="file" className="cursor-pointer" />
            </div>
          </div>
          {
                        loading?<Button><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button>:<Button type="submit" className="w-full my-4">Signup</Button>
                    }
          <span>Already have an account ? <Link to="/login" className="text-red-500">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
