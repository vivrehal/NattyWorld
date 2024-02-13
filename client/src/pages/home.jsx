import React, { useEffect, useState } from "react";
import workoutImg from "../assets/workout.png";
import { NavLink, useNavigate } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import Services from "../components/Services";
const Home = () => {

  const [currentUser, setcurrentUser] = useState("");  

  const navigate = useNavigate(); 

  useEffect(() => {
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user?.name)
    setcurrentUser(user?.name);
}, [setcurrentUser, localStorage])


  return (
    <>
      <div className=" px-16 pb-[12em] flex flex-col items-center bg-[#0d0d0d] text-slate-50 overflow-hidden">
        <div className="hero h-[100vh] w-[100%] flex flex-row">
          <div className="leftContainer w-[50%] flex flex-col items-center justify-center">
            <div className="welcomeCon flex flex-col justify-start gap-4">
              <h1 className="text-7xl font-bold">WELCOME</h1>
              <h1 className="text-2xl">
                {currentUser?.toUpperCase() || (
                  <button onClick={()=>{navigate('/login')}} className="px-4 py-3 font-semibold rounded-md border-2 border-[#353535a2] hover: hover:bg-[#353535a2]">
                    SIGN UP / LOGIN
                  </button>
                )}
              </h1>
              <p className="text-3xl">
                Welcome to NattyWorld - Your Ultimate Destination for Fitness
                Excellence!
              </p>
              <p>
                Embark on a journey towards your healthiest self with
                NattyWorld, where cutting-edge technology meets personalized
                fitness solutions. Our innovative platform offers you the tools
                to sculpt your dream physique, optimize your nutrition, and
                crush your fitness goals like never before.
              </p>
            </div>
          </div>
          <div className="rightComtainer w-[50%] flex flex-col items-center justify-center">
            <img
              src={workoutImg}
              alt="Body Builders doing Workout"
              className="w-[100%]"
            />
          </div>
        </div>
        <Services/>
      </div>
    </>
  );
};

export default Home;
