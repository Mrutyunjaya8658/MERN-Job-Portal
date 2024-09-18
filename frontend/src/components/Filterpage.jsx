import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType:"location",
        array:["Bhubaneswar","Hyderabad","Pune","Mumbai","Lucknow"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Devveloper","FullStack Developer","Data Analyst"]
    },
    {
        filterType:"Salary",
        array:["0-40k","42-1lac","1-5 lac"]
    },

]

const Filterpage = () => {
    const [selectedValue,setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const handleChange = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchQuery(selectedValue));
    },[selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>
            filter Jobs
        </h1>
        <hr className='mt-3' />
        <RadioGroup value={selectedValue} onValueChange={handleChange}>
            {
                filterData.map((data, index) => (
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `r${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                            )
                        })
                    }
                   </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default Filterpage