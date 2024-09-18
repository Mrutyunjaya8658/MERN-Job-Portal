import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/context'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
   
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store => store.auth);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const isApplied = singleJob?.applications?.some(app => app.applicant == user?._id) ||  false;

    const [applied , setApplied] = useState(isApplied);

    const applyJobHandler = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
        console.log(res.data);
        if (res.data.success) {
          
          setApplied(true) //update the local state
          const updateSingleJob = {...singleJob , applications:[...singleJob.applications,{applicant:user?._id}]};
          dispatch(setSingleJob(updateSingleJob));//helps to update in real time
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        
      }
    }

    useEffect(()=>{
      const fetchSingleJob = async ()=>{
          try {
              const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
              
              if (res.data.success) {
                  dispatch(setSingleJob(res.data.job));
                  setApplied(res.data.applications.some(application => application.applicant == user?._id));
                  
              }
          } catch (error) {
              console.log(error);
              
          }
      }
      fetchSingleJob();
    },[jobId,dispatch, user?._id])
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex justify-between'>
        <div>
        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
        <div className='flex items-center gap-3 my-4'>
            <Badge className={"text-purple-950 font-bold border-[#ffbd03]"} variant={Ghost}>{singleJob?.position}Positions</Badge>
            <Badge className={"text-black font-bold border-[#ffbd03]"} variant={Ghost}>{singleJob?.jobType}</Badge>
            <Badge className={"text-red-700 font-bold border-[#ffbd03]"} variant={Ghost}>{singleJob?.salary}LPA</Badge>
        </div>
        
        </div>
        <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-700 cursor-not-allowed' : 'bg-[#ffbd03] hover:bg-[#c29200]'}`}>{ isApplied ?"Already Applied" :" Apply Now"}</Button>
        </div>
        <h1 className='border-b-2 border-b-gray-500 font-medium my-4'>Job Description</h1>

        <div>
           <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-900'>{singleJob?.position}</span></h1>
           <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-900'>{singleJob?.location}</span></h1>
           <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-900'>{singleJob?.description}</span></h1>
           <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-900'>{singleJob?.experience}yrs</span></h1>
           <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-900'>{singleJob?.salary}LPA</span></h1>
           <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-900'>{singleJob?.applications?.length}</span></h1>
           <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-900'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
        
    </div>
  )
}

export default JobDescription