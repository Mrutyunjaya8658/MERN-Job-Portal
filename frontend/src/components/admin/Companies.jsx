import React, { useEffect, useState } from 'react'
import Navbar from '../sharable/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input,setInput] = useState("");

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
    },[input])
  return (
    <div>
        <Navbar/>
        <div className=' max-w-6xl my-10 mx-auto'>
            <div className='flex items-center justify-between my-5'>
            <Input onChange={(e)=>setInput(e.target.value)} className="w-fit" placeholder="filter by name" />
            <Button onClick = {()=> navigate("/admin/companies/create")} >New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies