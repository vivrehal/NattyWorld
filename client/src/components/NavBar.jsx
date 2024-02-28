import React,{ useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { Link } from "react-scroll"

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState({});
  
  const getUserData = async () => {
    const user=await fetch("/api/v1/users/getAuthStatus",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
    })
    if(user.status>=300){
      const tryNewToken=await fetch("/api/v1/users/refresh_token ",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
      })
      if(tryNewToken.status>=300){
        dispatch(setUser({}))
        navigate("/login")
        return
      }
      const res=await tryNewToken.json();
      setloggedInUser(res?.data?.user)
      dispatch(setUser(res?.data?.user))
      navigate("/")
      return
      
    }
    const res=await user.json();
    setloggedInUser(res)
    dispatch(setUser(res))
  }
  useEffect(() => {
    (async()=>{
      await getUserData()
    }
    )()
  },[])

  const user=useSelector(state=>state.user);



  const items = [
    {
      name: "Home",
      href: "/",
      scroll_id: "home_container"
    },
    {
      name: "Services",
      href: "/",
      scroll_id: "services_container"
    },
    {
      name: "About Us",
      href: "#",
      scroll_id: "aboutUs_container"
    },
    {
      name: "Diets",
      href: "/allDiets",
      scroll_id: "#"
    },
    {
      name: "Workouts",
      href: "/allWorkouts",
      scroll_id: "#"
    },
  ];

  const logoutUser = async(e) => {
    e.preventDefault();
    setloggedInUser(null);
    const res=await fetch("/api/v1/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        });
    const  response=await res.json();
    if(res.status>=400){
        alert("Error while logging out")
        console.log(response.error)
        return
    }
    dispatch(setUser({}))
    setisToggled(false)
    alert("Logged Out Successfully")
    navigate("/login");
}



  const [isToggled, setisToggled] = useState(false);
  // console.log(isLoggedIn)
  return (
    <>
      <div className="fixed flex-row bg-[#0d0d0d] h-16 text-slate-50 w-[100vw]">
        <div className="flex flex-row px-10 py-2 justify-between w-[100vw] items-center">
          <div className="siteName w-[20%]">
            <h1 className="font-bold font-sans text-3xl">NattyWorld</h1>
          </div>
          <div className="pageList w-[50%]">
            <ul className="flex list-none flex-row justify-center gap-16">
              {items.map((item, index) => (
                <Link 
                to={item.scroll_id}
                activeClass="active"
                spy={true} 
                smooth={true}
                className="cursor-pointer"
                key={index} // Add key prop with a unique value
                >
                  <NavLink to={item.href} key={index}>
                    <li className="navList">{item.name}</li>
                  </NavLink>
                </Link>
              ))}

            </ul>
          </div>
          <div className="flex userProf w-[20%] justify-end">
            {user?.name ? (
              <div className="dropdown">
                <button
                  onClick={()=>{
                    setisToggled(!isToggled)
                  }}
                >
                  {user?.name.toUpperCase()}
                </button>
                {isToggled && (
                  <ul className="dropdown-menu -menu absolute top-[70%] right-6 mt-0 bg-[#171717] text-white rounded-md shadow-lg">
                    <li>
                      <NavLink
                        to="/myProfile"
                        className="block px-4 py-2 text-sm hover:bg-[#0d0d0d]"
                        onClick={()=>{
                          setisToggled(false)
                        }}

                      >
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/myDiets"
                        className="block px-4 py-2 text-sm hover:bg-[#0d0d0d]"
                        onClick={()=>{
                          setisToggled(false)
                        }}
                      >
                        My Diets
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/myWorkouts"
                        className="block px-4 py-2 text-sm hover:bg-[#0d0d0d]"
                        onClick={()=>{
                          setisToggled(false)
                        }}
                      >
                        My Workouts
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={(e) => {
                          logoutUser(e);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-[#0d0d0d] font-bold text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="bg-[#0d0d0d] rounded-md px-3 py-2 hover:bg-[#353535]"
              >
                SIGN UP / LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
