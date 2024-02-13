import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user?.name);
    setloggedInUser(user?.name);
  }, [setloggedInUser]);

  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Services",
      href: "#",
    },
    {
      name: "About Us",
      href: "#",
    },
  ];

  const logoutUser = async(e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setloggedInUser(null);
    const res=await fetch("/api/v1/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        });
    const  response=await res.json();
    if(response.status>=400){
        alert("Error while logging out")
        console.log(response.error)
        return
    }
    alert("Logged Out Successfully")
    navigate("/");
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
                <NavLink to={item.href} key={index}>
                  <li className="navList">{item.name}</li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="flex userProf w-[20%] justify-end">
            {loggedInUser ? (
              <div className="dropdown">
                <button
                  onClick={() => {
                    setisToggled(!isToggled);
                  }}
                >
                  {loggedInUser?.toUpperCase()}
                </button>
                {isToggled && (
                  <ul className="dropdown-menu -menu absolute top-[70%] right-6 mt-0 bg-[#171717] text-white rounded-md shadow-lg">
                    <li>
                      <NavLink
                        to="/myProfile"
                        className="block px-4 py-2 text-sm hover:bg-[#0d0d0d]"
                      >
                        My Profile
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
