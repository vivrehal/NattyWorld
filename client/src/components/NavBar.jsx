import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading.jsx";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    setIsLoading(true);
    const user=await fetch("https://nattyworld-server.onrender.com/api/v1/users/getAuthStatus",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      }, 
      body:JSON.stringify({
        accessToken:localStorage.getItem('accessToken')      })
    })
    if(user?.status>=300){
      const tryNewToken=await fetch("https://nattyworld-server.onrender.com/api/v1/users/refresh_token ",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({refreshToken:localStorage.getItem("refreshToken")})
      })
      if(tryNewToken.status>=300){
        dispatch(setUser({}))
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoading(false);
        navigate("/login");
        return;
      }
      const res = await tryNewToken.json();
      setloggedInUser(res?.data?.user);
      dispatch(setUser(res?.data?.user));
      localStorage.setItem("accessToken", res?.data?.accessToken);
      setIsLoading(false);
      navigate("/");
      return;
    }
    const res = await user.json();
    setloggedInUser(res);
    dispatch(setUser(res));
    setIsLoading(false);
  };
  useEffect(() => {
    (async () => {
      await getUserData();
    })();
  }, []);

  const user = useSelector((state) => state.user);


  const items = [
    {
      name: "Home",
      href: "/",
      scroll_id: "home_container",
    },
    {
      name: "Services",
      href: "/",
      scroll_id: "services_container",
    },
    {
      name: "About Us",
      href: "#",
      scroll_id: "aboutUs_container",
    },
    {
      name: "Diets",
      href: "/allDiets",
      scroll_id: "#",
    },
    {
      name: "Workouts",
      href: "/allWorkouts",
      scroll_id: "#",
    },
  ];

  const logoutUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setloggedInUser(null);
    const res=await fetch("https://nattyworld-server.onrender.com/api/v1/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: localStorage.getItem("accessToken") }),
        });
    const  response=await res.json();
    if(res.status>=400){
        setIsLoading(false);
        alert("Error while logging out")
        console.log(response.error)
        return
    }
    dispatch(setUser({}))
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setisToggled(false)
    setIsLoading(false);
    alert("Logged Out Successfully")
    navigate("/login");
  };

  const [isToggled, setisToggled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false); 
  // console.log(isLoggedIn)
  return (
    <>
      {isLoading && <Loading/>}
      <div className="fixed flex-row bg-[#0d0d0d] h-16 text-slate-50 w-[100vw] z-10">
        <div className="flex flex-row px-10 py-2 justify-between w-[100vw] items-center">
          <div className="siteName w-[20%]">
            <NavLink to="/"><h1 className="font-bold font-sans text-lg md:text-3xl">NattyWorld</h1></NavLink>
          </div>
          <div className=" hidden md:block pageList w-[60%]">
            <ul className="flex list-none flex-row justify-center gap-16">
              {items.map((item, index) => (
                <Link
                  to={item.scroll_id}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  className="cursor-pointer hover:text-blue-700 hover:drop-shadow-[0_35px_35px_rgba(255, 255, 255)] "
                  key={index} // Add key prop with a unique value
                >
                  <NavLink to={item.href} key={index}>
                    <li className="navList">{item.name}</li>
                  </NavLink>
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex userProf w-[50%] justify-end md:w-[20%]">
            {user?.name ? (
              <div className="dropdown pt-2 md:pt-0">
                <button
                  onClick={() => {
                    setisToggled(!isToggled);
                    setToggleMenu(false);
                  }}
                  className="hover:text-red-500"
                >
                  {user?.name.toUpperCase()}
                </button>
                {isToggled && (
                  <ul className="dropdown-menu -menu absolute top-[70%] right-[15%] md:right-7 mt-0 bg-[#171717] text-white rounded-md shadow-lg">
                    <li>
                      <NavLink
                        to="/myProfile"
                        className="block px-4 py-2 text-sm hover:bg-[#0d0d0d]"
                        onClick={() => {
                          setisToggled(false);
                
                        }}
                      >
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/myDiets"
                        className="block px-4 py-2 text-sm hover:bg-[#0d0d0d]"
                        onClick={() => {
                          setisToggled(false);
                        }}
                      >
                        My Diets
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/myWorkouts"
                        className="block px-4 py-2 text-sm hover:bg-[#0d0d0d]"
                        onClick={() => {
                          setisToggled(false);
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
                className="bg-[#0d0d0d] rounded-md text-sm md:text-lg px-3 py-2 hover:bg-blue-700"
              >
                SIGN UP / LOGIN
              </button>
            )}
            <button
              className="block md:hidden hamburger mx-3 px-3 py-2 hover:bg-blue-700 rounded-md"
              onClick={() => {
                setToggleMenu(!toggleMenu);
                setisToggled(false);
              }}
            >
              Menu
            </button>
              {toggleMenu && (
                <ul className="block md:hidden hamburger dropdown-menu -menu absolute top-[86%] w-[40%] sm:w-[20%] flex flex-col justify-center items-center right-10 mt-0 bg-[#171717] text-white rounded-md shadow-lg">
                  {items.map((item, index) => (
                    <Link
                      to={item.scroll_id}
                      activeClass="active"
                      spy={true}
                      smooth={true}
                      className="cursor-pointer hover:text-blue-700 py-3 px-3 "
                      key={index} // Add key prop with a unique value
                      onClick={() => {
                        setToggleMenu(!toggleMenu);
                        console.log(toggleMenu);
                      }}
                    >
                      <NavLink to={item.href} key={index}>
                        <li className="navList">{item.name}</li>
                      </NavLink>
                    </Link>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
