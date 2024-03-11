import {useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import workoutImg from "../assets/workout.png";
import Otp from '../components/otp';
import Loading from '../components/Loading';

const Signup = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpVisibility, setOtpVisiblity] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit=async(e)=>{
    setIsLoading(true)
    try {
      e.preventDefault()
      const pass = formData.password;
      console.log(pass)
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(pass)){
        setIsLoading(false)
        alert("Password should contain atleast 8 characters, 1 special character, 1 number and 1 alphabet")
        return ;
      }

      const sendOtp=await fetch('https://nattyworld-server.onrender.com/api/v1/users/sendOtp',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:formData.email}),
      })

      if(!sendOtp.ok){
        setIsLoading(false)
        alert("Error while sending OTP") 
        console.log(sendOtp.json().message)
        return
      }

      setIsLoading(false)
      setOtpVisiblity(true)

    } catch (error) {
      setIsLoading(false)
      alert(error)
      console.log(error)
    }
    setIsLoading(false)
  }


  return (
    <>
      {isLoading && <Loading/>}
      {otpVisibility && <Otp user={formData}/>}
      {!otpVisibility && <div className="flex-col pt-16 bg-[#0d0d0d] flex lg:flex-row ">
        <div className="leftList flex flex-col items-center w-[100%] lg:w-[60%]">
          <div className="formForDiet p-10 w-[100%] h-[100%] flex flex-col justify-center bg-[#171717]">
            <h2 className="text-4xl font-bold text-white pb-8 self-center">
              Sign Up
            </h2>
            <form
              method="POST"
              className=" flex flex-col gap-6 w-[60%] self-center items-center" 
            >
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  Full Name
                </label>
                <br />
                <input
                  name="name"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  Username
                </label>
                <br />
                <input
                  name="username"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  Email
                </label>
                <br />
                <input
                  name="email"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  DOB
                </label>
                <br />
                <input
                  name="dob"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  Height (cms)
                </label>
                <br />
                <input
                  name="height"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="number"
                />
              </div>
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  Weight (kgs)
                </label>
                <br />
                <input
                  name="weight"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="number"
                />
              </div>
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  Password
                </label>
                <br />
                <input
                  name="password"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="password"
                />
              </div>

              <div className="generateBtn flex flex-row w-[70%] h-[15%] justify-center items-center">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
              <div className="newUser">
                <NavLink to="/login">
                  <h1 className="font-light text-gray-400">
                    Existing User? Login Here
                  </h1>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
        <div className="rightList w-[40%] h-[90vh] py-16 px-4 flex flex-col justify-center items-center">
          <div className="inpText w-[100%] h-[90%]">
            <img src={workoutImg} />
          </div>
        </div>
      </div>}
    </>
  )
}

export default Signup