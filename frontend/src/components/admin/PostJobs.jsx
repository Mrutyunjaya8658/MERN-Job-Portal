import React, { useState } from "react";
import Navbar from "../sharable/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/context";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const companyArray = [];

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() == value);
    setInput({...input,companyId:selectedCompany._id});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
            headers:{
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/jobs");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        
    } finally{
        setLoading(false);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-700 shadow-inner rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    
                    {
                        companies.map((company)=> {
                            return(
                                <SelectItem value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                               
                            )
                        })
                    }
                 
                </SelectGroup>
              </SelectContent>
            </Select>
            )}
          </div>
          
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {companies.length == 0 && (
            <p className="text-xs font-bold text-red-800 text-center my-3">
              Please register company ,before posting job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
