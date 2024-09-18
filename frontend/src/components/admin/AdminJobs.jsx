import React, { useEffect, useState } from 'react'
import Navbar from '../sharable/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input,setInput] = useState("");

    useEffect(()=>{
      dispatch(setSearchJobByText(input));
    },[input])
  return (
    <div>
        <Navbar/>
        <div className=' max-w-6xl my-10 mx-auto'>
            <div className='flex items-center justify-between my-5'>
            <Input onChange={(e)=>setInput(e.target.value)} className="w-fit" placeholder="filter by name or role" />
            <Button onClick = {()=> navigate("/admin/jobs/create")} >New Jobs</Button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs