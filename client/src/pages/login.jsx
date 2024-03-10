import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import loginBanner from "../assets/loginBanner.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userSlice";
import Loading from "../components/Loading";

const Login = () => {


  const [isLoading, setIsLoading] = useState(false);


  const dispatch=useDispatch()
  const navigate=useNavigate()


const currUser=useSelector(state=>state.user?.name)
  useEffect(() => {
    if(currUser){
      // navigate('/')
    }
  }, []);

  const [formData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit=async(e)=>{
    try {
      setIsLoading(true)
      e.preventDefault()
      const res=await fetch('https://nattyworld-server.onrender.com/api/v1/users/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if(!res){
        setIsLoading(false)
        alert("Error while validating User")
        console.log("Error while validating User") 
        return
      }
      const response=await res.json();
      if(res.status>=400){
        // console.log("inside if")
        setIsLoading(false)
        alert(response?.message)
        // console.log(response.error+" ")
        return
      }
      // console.log(response.data)
      localStorage.setItem('accessToken',response?.data?.accessToken)
      localStorage.setItem('refreshToken',response?.data?.refreshToken)
      dispatch(setUser(response?.data?.loggedInUser))
      setIsLoading(false)
      // localStorage.setItem('accessToken',JSON.stringify(response?.data?.accessToken))
      // localStorage.setItem('refreshToken',JSON.stringify(response?.data?.refreshToken))
      navigate('/')


    } catch (error) {
      alert(error)
      console.log(error)
    }
  }


  return (
    <>
      { isLoading && <Loading/>}
      <div className="flex-col pt-16 bg-[#0d0d0d] flex lg:flex-row ">
        <div className="leftList flex flex-col items-center w-[100%] lg:w-[60%]">
          <div className="formForDiet p-10 w-[100%] h-[100%] flex flex-col justify-center bg-[#171717]">
            <h2 className="text-4xl font-bold text-white pb-8 self-center">
              Login
            </h2>
            <form
              method="POST"
              className=" flex flex-col gap-6 w-[60%] self-center items-center"
            >
              <div className="w-[100%]">
                <label className="text-white" htmlFor="name">
                  Username or Email
                </label>
                <br />
                <input
                  name="usernameOrEmail"
                  onChange={(e) => handleInput(e)}
                  className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
                  type="text"
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
                  className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
                >
                  LOGIN
                </button>
              </div>
              <div className="newUser">
                <NavLink to="/Signup">
                  <h1 className="font-light text-gray-400">
                    New User? Sign Up Here
                  </h1>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
        <div className="rightList h-[90vh] py-16 px-4 flex flex-row w-[100%] md:w-[40%] justify-center items-center">
          <div className="inpText w-[100%] h-[90%] self-center">
            <img src={loginBanner} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
