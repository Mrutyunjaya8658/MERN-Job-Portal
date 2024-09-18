import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/context'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfile = ({open,setOpen}) => {
    const [loading,setLoading] = useState(false);
    const {user} = useSelector(store => store.auth);
    const [input,setInput] = useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill => skill),
        file:user?.profile?.resume
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) =>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input,file});
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if(input.file){
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(res.data.message);
            
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
        
    }
  return (
    <div>
        <Dialog open={open}>
            <DialogContent description="This dial" className="sm:max-w-[425px]" onInteractOutside={()=> setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>
                        Update Profile
                    </DialogTitle>
                </DialogHeader>
                <form action="" onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" onChange={changeEventHandler} name="name" value={input.fullname} className="col-span-3" />
                        </div>
                        
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input type="email" id="email" onChange={changeEventHandler} name="email" value={input.email} className="col-span-3"  />
                        </div>
                        
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="number" className="text-right">Number</Label>
                        <Input type="number" onChange={changeEventHandler} id="number" value={input.phoneNumber} name="number" className="col-span-3"  />
                        </div>
                        
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="bio" className="text-right">Bio</Label>
                        <Input id="bio" onChange={changeEventHandler} name="bio" value={input.bio} className="col-span-3"  />
                        </div>
                        
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="skills" className="text-right">Skills</Label>
                        <Input id="skills" onChange={changeEventHandler} name="skills" value={input.skills} className="col-span-3"  />
                        </div>
                        
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="file" className="text-right">Resume</Label>
                        <Input onChange={changeFileHandler} type="file" accept="application/pdf" id="file" name="file" className="col-span-3"  />
                        </div>
                        
                    </div>
                    <DialogFooter>
                    {
                        loading?<Button><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button>:<Button type="submit" className="w-full my-4">Update</Button>
                    }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfile