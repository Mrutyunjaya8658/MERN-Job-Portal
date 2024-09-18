import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { USER_API_END_POINT } from "@/utils/context";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-2 items-center">
              <Link to="/login">
                <Button variant="outline" className="border-black">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#ffbd03] hover:bg-[#6d5b28]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover className="cursor-pointer">
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="cursor-pointer w-80">
                <div className="flex gap-3 space-y-2">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="my-2 flex items-start flex-col gap-3 text-gray-600">
                  {user &&
                    user.role ==
                      "student" && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 />
                          <Button variant="link">
                            {" "}
                            <Link to={"/profile"}>Profile Overview</Link>
                          </Button>
                        </div>
                      )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Log Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
