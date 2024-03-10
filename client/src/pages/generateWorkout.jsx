import { useEffect, useState } from "react";
import { useSelector } from "react-redux";  
import Loading from "../components/Loading";


const GenerateWorkout = () => {
  const [workoutPlan, setWorkoutPlan] = useState("");


  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return Number(age);
  }

  const [userLoggedIn, setuserLoggedIn] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  const userCurrent=useSelector((state)=>state.user);

  useEffect(() => {
    setuserLoggedIn(userCurrent);
    console.log(userLoggedIn)
  }, [setuserLoggedIn, userCurrent])
  
   
  const [formData, setFormData] = useState({
        name:"",
        workoutLevel:"", 
        age:"",
        gender:"", 
        weight:"", 
        height:"",
        daysAvailable:"", 
        weakMuscle:"", 
        workoutType:"",
        fitnessGoal:"", 
        otherPreferences:"",
        sleepDuration:"",
        workoutDuration:"",
        splitType:"",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const generateWorkoutByAI = async (formData) => {
    setIsLoading(true);
    const res = await fetch("https://nattyworld-server.onrender.com/api/v1/ai/generateWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData, accessToken: localStorage.getItem("accessToken")}),
    });
    const response = await res.json();
    if (!response?.data?.workoutPlan?.content) {
      alert("Cannot fetch workout Plan");
    }
    setWorkoutPlan(response.data.workoutPlan.content);
    setIsLoading(false);
  };

  const saveWorkout = async () => {
    setIsLoading(true);
    if(workoutPlan===""){
      setIsLoading(false);
      alert("Please Generate Workout Plan First");
      return
    }
    const workoutDetails={
      name:`${formData.fitnessGoal} | ${formData.splitType} | ${formData.gender} | ${formData.workoutDuration} hrs`,
      plan : workoutPlan
    }
    const res = await fetch("https://nattyworld-server.onrender.com/api/v1/workouts/addWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...workoutDetails, accessToken: localStorage.getItem("accessToken")}),
    });
    const response = await res.json();
    if (!response?.data) {
      setIsLoading(false);
      alert("Cannot save workout Plan");
      return
    }
    else{
      setIsLoading(false);
      alert("Workout Plan Saved Successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateWorkoutByAI(formData);
  };

  return (
    <>
    { isLoading && <Loading/>}
      <div className="flex-col pt-16 bg-[#0d0d0d] flex lg:flex-row ">
        <div className="leftList lg:overflow-y-auto lg:h-[90vh] flex flex-col items-center w-[100%] lg:w-[35%] bg-[#171717]">
          <div className="formForworkout p-10">
            <h2 className="text-3xl font-bold text-white pb-8">Generate Your workout</h2>
            <form method="POST" className=" flex flex-col gap-6">
              <div className="">
                <label className="text-white" htmlFor="name">
                  Name
                </label>
                <br />
                <input
                  name="name"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="text"
                  defaultValue={userLoggedIn?.name}
                />
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Height (cms)
                </label>
                <br />
                <input
                  name="height"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  defaultValue={userLoggedIn?.height}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Weight (kgs)
                </label>
                <br />
                <input
                  name="weight"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  defaultValue={userLoggedIn?.weight}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Gender
                </label>
                <br />
                <select
                  name="gender"
                  value={formData.gender}
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  onChange={(e) => handleInput(e)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Age
                </label>
                <br />
                <input
                  name="age"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  defaultValue={getAge(userLoggedIn?.dob)}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Avaiable Days in a Week
                </label>
                <br />
                <input
                  name="daysAvailable"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  min={1}
                  max={7}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Workout Duration (hrs)
                </label>
                <br />
                <input
                  name="workoutDuration"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  min={0.5}
                  max={4}
                />
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Sleep Duration (hrs)
                </label>
                <br />
                <input
                  name="sleepDuration"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md "
                  type="number"
                  min={6}
                  max={12}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="name">
                  Weak Muscle
                </label>
                <br />
                <select
                  name="weakMuscle"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  value={workoutPlan.weakMuscle}
                >
                  <option value="">Select Muscle</option>
                  <option value="chest">Chest</option>
                  <option value="back">Back</option>
                  <option value="triceps">Triceps</option>
                  <option value="biceps">Biceps</option>
                  <option value="legs and glutes">Legs & Glutes</option>
                  <option value="shoulders">Shoulders</option>
                  <option value="abs and core">Abs and Core</option>
                </select>
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Fitness Goal
                </label>
                <br />
                <select
                  name="fitnessGoal"
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  value={workoutPlan.fitnessGoal}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                >
                  <option value="fat loss">Fat Loss</option>
                  <option value="lean bulk">Lean Bulk</option>
                  <option value="weight gain">Weight Gain</option>
                  <option value="weight loss">Weight Loss</option>
                  <option value="Maintain Weight and Fat Loss">
                    Maintain Weight and Fat Loss
                  </option>
                </select>
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Workout Level
                </label>
                <br />
                <select
                  name="workoutLevel"
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  value={workoutPlan.workoutLevel}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advance">Advance</option>
                </select>
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Workout Type
                </label>
                <br />
                <select
                  name="workoutType"
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  value={workoutPlan.workoutType}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                >
                  <option value="Body Building">Body Building</option>
                  <option value="Power Lifting">Power Lifting</option>
                  <option value="Calisthenics">Calisthenics</option>
                  <option value="Cross Fit">Cross Fit</option>
                  <option value="Atheletic">Atheletic</option>
                </select>
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Split Type
                </label>
                <br />
                <select
                  name="splitType"
                  id=""
                  className="py-1 px-4 w-[100%] rounded-md"
                  value={workoutPlan.splitType}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                >
                  <option value="Bro Split">Bro Split</option>
                  <option value="Push Pull Legs">Push Pull Legs</option>
                  <option value="Full Body">Full Body</option>
                  <option value="Mix and Match">Mix and Match</option>
                  <option value="Single Muscle">Single Muscle</option>
                </select>
              </div>

              <div className="">
                <label className="text-white" htmlFor="name">
                  Other Preferences
                </label>
                <br />
                <input
                  name="otherPreferences"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="text"
                />
              </div>



              <div className="generateBtn flex flex-row w-[100%] h-[15%] justify-center items-center">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
                >
                  GENERATE
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="rightList w-[100%] h-[90vh] p-4 flex flex-col">
          <div className="inpText w-[100%] h-[90%]">
            <textarea
              name=""
              id=""
              value={workoutPlan}
              cols="30"
              rows="10"
              className="h-[100%] w-[100%] overflow-y-auto resize-none border-none focus:outline-none border-4 bg-[#171717] rounded-xl p-4 text-white"
              readOnly={true}
            ></textarea>
          </div>
          <div className="generateBtn flex flex-row w-[100%] h-[10%] justify-center items-center">
                <button
                  onClick={(e) => {
                    saveWorkout();
                  }}
                  className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
                >
                  ADD TO MY WORKOUT
                </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateWorkout;
