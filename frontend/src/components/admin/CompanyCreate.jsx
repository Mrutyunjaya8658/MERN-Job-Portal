import React, { useState } from 'react'
import Navbar from '../sharable/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { AlertOctagon, ArrowBigLeftIcon, ArrowBigRightDashIcon, Cross, DoorClosed, Goal, Move3DIcon, SkipForward } from 'lucide-react'
import { FaClosedCaptioning, FaProcedures } from 'react-icons/fa'
import { DialogClose } from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/context'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { setLoading } from '@/redux/authSlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName,setCompanyName] = useState();

    const registerNewCompany = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/registerCompany` , {companyName} , {
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            } )
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);

            }
        } catch (error) {
            console.log(error);
            
        } finally{
            setLoading(false);
        }
    }
  return (
    <div>
        <Navbar/>
        <div className=' max-w-4xl mx-auto'>
            <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-600'>You can change this later</p>
            </div>
            
            <Label>
                Company Name
            </Label>
            <Input onChange={(e)=>setCompanyName(e.target.value)} type="text" className="my-2" placeholder="Microsoft" />

            <div className='flex items-center gap-2 my-10'>
                <Button onClick = {()=> navigate("/admin/companies")} variant="outline" className="flex items-center gap-2"> <AlertOctagon/> Cancel</Button>
                <Button onClick={registerNewCompany} className="flex items-center gap-2"> <ArrowBigRightDashIcon/> Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate