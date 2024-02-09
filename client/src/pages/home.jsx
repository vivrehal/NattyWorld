import React, { useState } from "react";
import workoutImg from "../assets/workout.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightScale,
  faDumbbell,
  faBowlFood,
  faBicycle,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Testimonials from "../components/Testimonials";
const Home = () => {
  const features = [
    {
      title: "Calculate BMI",
      image: faWeightScale,
      href: "",
      desc: "",
    },
    {
      title: "Generate Diet",
      image: faBowlFood,
      href: "",
      desc: "",
    },
    {
      title: "Generate Workout",
      image: faBicycle,
      href: "",
      desc: "",
    },
    {
      title: "Find Gyms Nearby",
      image: faDumbbell,
      href: "",
      desc: "",
    },
    {
      title: "Calorie Calculator",
      image: faCalculator,
      href: "",
      desc: "",
    },
  ];
  const [currentUser, setcurrentUser] = useState("");
  return (
    <>
      <div className=" px-16 pb-[12em] flex flex-col items-center bg-black text-slate-50 overflow-hidden">
        <div className="hero h-[100vh] w-[100%] flex flex-row">
          <div className="leftContainer w-[50%] flex flex-col items-center justify-center">
            <div className="welcomeCon flex flex-col justify-start gap-4">
              <h1 className="text-7xl font-bold">WELCOME</h1>
              <h1 className="text-2xl">
                {currentUser || (
                  <button className="px-4 py-3 font-semibold rounded-md border-2 border-[#353535a2] hover: hover:bg-[#353535a2]">
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
        <div className="features w-[100%] flex flex-col rounded-[2em] py-6 gap-4">
          <div className="featureTitle self-center text-3xl font-bold">
            <h2>CHOOSE AMONG VARIOUS FEATURES !</h2>
          </div>
          <div className="flex flex-row justify-evenly featureWrapper w-[100%] p-4">
            {features.map((feature, index) => {
              return (
                <div className=" p-3 bg-black rounded-[2em]" key={index}>
                  <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-center">
                    <FontAwesomeIcon
                      icon={feature.image}
                      className="w-[6em] h-[6em] px-6 self-center"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 text-center">
                        {feature.title}
                      </div>
                      <p className="text-gray-700 text-base text-center">
                        {feature.desc}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2 self-center">
                      <NavLink to={feature.href}>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          TRY IT
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
