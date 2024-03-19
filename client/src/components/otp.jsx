import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';

const Otp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState(null);
    const handleChange = (e) => {
        setOtp(e.target.value);
    }
    const navigate=useNavigate();

    const handleSubmit = async(e)=>{
        setIsLoading(true)
        e.preventDefault();
        const res=await fetch('https://nattyworld-server.onrender.com/api/v1/users/verifyOtp',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({otp,email:props.user.email}),
        })
        if(!res.ok){
            const msg=await res.json();
            setIsLoading(false)
            alert(msg.message)
            console.log(msg.message)
            return
        }

        console.log(props.user)

        const userRes=await fetch('https://nattyworld-server.onrender.com/api/v1/users/register',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(props.user),
          })
          console.log(res)
          if(!userRes.ok){
            const msg=await res.json();
            setIsLoading(false)
            alert(msg.message)
            console.log("Error while validating User")
            return
          }
          const response=await userRes.json();
    
          if(userRes.status>=400){
            setIsLoading(false)
            alert("Error while registering User")
            console.log(response.message)
            return
          }
            setIsLoading(false)
          alert("User Registered Successfully")
          navigate('/login')

    }   

  return (
    <>
    {isLoading && <Loading/>}
    <div className="otp-outer pt-[5rem] text-white w-[100%] h-[100vh]">
        <div className="otp-inner flex flex-row justify-center items-center w-[100%] h-[100%]">
            <div className="otp-form w-[60%] bg-[#171717] h-[50%] rounded-xl flex flex-col items-center p-6">
            <form method='POST' >
                <div className="otp-form-inner flex flex-col justify-center items-center">
                <div className="otp-form-header flex flex-col items-center">
                    <p className="text-2xl font-bold">Enter OTP</p>
                    <p className="text-red-600 font-bold pt-6 text-sm sm:text-lg">*Enter the OTP sent to your E-mail</p>
                </div>
                <div className="otp-form-input pt-6 w-[100%] flex flex-col items-center">
                    <input type="text" value={otp} onChange={(e)=>{handleChange(e)}} className="px-3 py-2 w-[90%] rounded-lg text-black" placeholder="Enter OTP" />
                </div>
                <div className="otp-form-btn pt-16">
                    <button className="px-8 py-3 bg-[#0d0d0d] rounded-lg hover:bg-blue-700 font-bold" onClick={handleSubmit}>Submit</button>
                </div>
                </div>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Otp