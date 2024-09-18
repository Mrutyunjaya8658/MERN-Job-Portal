import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import {  useNavigate } from 'react-router-dom'


const HeroSection = () => {
  const[query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  }
  return (
    <div className='text-center'>
        <div className='flex flex-col my-4 gap-20'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-200 text-[#f83002] font-medium'>Hireist - The hub of hiring</span>
        <h1 className='text-8xl font-bold'>Search , Apply & <br /> Get Your <span className='text-[#ffbd03]'>Dream Job.</span></h1> 
          
        </div>
        <p className='text-2xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, repellat!</p> 
        <div className='flex items-center mx-auto my-4 w-[40%] shadow-lg border rounded-full'>
        <Input onChange={(e)=>setQuery(e.target.value)} className='p-5 h-12 rounded-full rounded-r-none' type="text" placeholder="Search for a Job" />
        <Button onClick={searchJobHandler} className="rounded-full rounded-l-none bg-[#ffbd03] h-12 border border-[black]">
            <Search className='h-5 w-5'/>
        </Button>
        </div>
    </div>
  )
}

export default HeroSection