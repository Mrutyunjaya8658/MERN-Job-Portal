import React, { useState } from "react";
import Navbar from "./sharable/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Phone, PhoneCall } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

// const skills = ["HTML" , "CSS" , "JavaScript" , "REST"];

const Profile = () => {
  useGetAppliedJobs();
    const [open,setOpen] = useState(false);
    const isHaveResume = true;
    const {user} = useSelector(store=>store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-5 p-8 border border-gray-200">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg" />
            </Avatar>
            <div>
              <h1 className="font-bold text-xl">{user?.fullname}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=> setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div>
            <div className="flex items-center gap-3 my-2">
            <Mail/>
            <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
            <Phone/>
            <span>{user?.phoneNumber}</span>
            </div>
        </div>
        <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-2">
            {
                user?.profile?.skills.length != 0 ?
                user?.profile?.skills.map((item,index)=> <Badge key={index}>{item}</Badge>) :
                <span>NA</span>
            }
            </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {
                isHaveResume ? <a className="text-blue-600 w-full hover:underline cursor-pointer" target="blank" href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
        </div>
        
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-bold text-xl">Applied Jobs</h1>
            
            <AppliedJobTable/>
        </div>
        <UpdateProfile open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
