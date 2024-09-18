import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Ghost } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "wdnjknewwne";

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const differenceTime = currentTime - createdAt;
    return Math.floor(differenceTime / (1000 * 24 * 60 * 60));
  }
  return (
    <div className="p-5 rounded-md shadow-lg border bg-[#DBDFEA] border-gray-400">
      <div className="flex items-center justify-between">
        <p className="text-sm">{daysAgo(job?.createdAt) == 0 ? "Today" : `${daysAgo(job?.createdAt)}`} days ago</p>
        <Button variant="outline" classname="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" size="icon" classname="p-6">
          <Avatar className="h-8 w-8 object-cover">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold">{job?.company?.name}</h1>
          <p className="text-sm">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm">{job?.description}</p>
      </div>
      <div className='flex items-center gap-3 my-4'>
            <Badge className={"text-purple-950 font-bold border-[#ffbd03]"} variant={Ghost}>{job?.position}Positions</Badge>
            <Badge className={"text-black font-bold border-[#ffbd03]"} variant={Ghost}>{job?.jobType}</Badge>
            <Badge className={"text-red-700 font-bold border-[#ffbd03]"} variant={Ghost}>{job?.salary}LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
        <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
            
            <Button className="bg-[#ffbd03]">Save For Later</Button>
        </div>
    </div>
  );
};

export default Job;
