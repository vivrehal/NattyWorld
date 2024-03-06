import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightScale,
  faDumbbell,
  faBowlFood,
  faBicycle,
  faRunning,
  faEgg
} from "@fortawesome/free-solid-svg-icons";

const Services = () => { 

    const features = [
        {
          title: "Calculate BMI",
          image: faWeightScale,
          href: "/bmi",
          desc: "",
        },
        {
          title: "Generate Diet",
          image: faBowlFood,
          href: "/generateDiet",
          desc: "",
        },
        {
          title: "Generate Workout",
          image: faBicycle,
          href: "/generateWorkout",
          desc: "",
        },
        {
          title: "Find Gyms Nearby",
          image: faDumbbell,
          href: "/gymsNearby",
          desc: "",
        },
        {
          title: "View Public Diets",
          image: faEgg,
          href: "/alldiets",
          desc: "",
        },
        {
          title: "View Public Workouts",
          image: faRunning,
          href: "/allworkouts",
          desc: "",
        }
      ];


  return (
    <div className="features w-[100%] flex flex-col rounded-[2em] py-6 gap-4" id="services_container">
    <div className="featureTitle self-center text-xl md:text-3xl pt-24 md:pt-0 font-bold">
      <h2>CHOOSE AMONG VARIOUS FEATURES !</h2>
    </div>
    <div className="flex flex-row justify-evenly flex-wrap featureWrapper w-[100%] p-4">
      {features.map((feature, index) => {
        return (
          <div className=" p-2 bg-[#0d0d0d] rounded-[2em]" key={index}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-center">
              <FontAwesomeIcon
                icon={feature.image}
                className="w-[4em] h-[4em] px-6 self-center"
              />
              <div className="px-4 py-4">
                <div className="font-bold text-lg mb-2 text-center">
                  {feature.title}
                </div>
                <p className="text-gray-700 text-base text-center">
                  {feature.desc}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 self-center">
                <NavLink to={feature.href}>
                  <span className="inline-block bg-gray-200 rounded-full hover:bg-blue-700 hover:text-white px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
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
  )
}

export default Services