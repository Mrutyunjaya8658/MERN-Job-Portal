import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/description/${job?._id}`)} className='p-5 rounded-md shadow-xl bg-[#DBDFEA] border-red-200 cursor-pointer'>
        <div>
        <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
        <p className='font-medium'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='font-medium'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-3 my-4'>
            <Badge className={"text-purple-950 font-bold border-[#ffbd03]"} variant={Ghost}>{job?.position}</Badge>
            <Badge className={"text-black font-bold border-[#ffbd03]"} variant={Ghost}>{job?.jobType}</Badge>
            <Badge className={"text-red-700 font-bold border-[#ffbd03]"} variant={Ghost}>{job?.salary}</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards