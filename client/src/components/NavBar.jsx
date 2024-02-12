import React,{useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate=useNavigate()
    const [loggedInUser, setloggedInUser] = useState(null)

    useEffect(() => {
        const getUserData=async()=>{
            try {
                    const userData= await fetch('/api/v1/users/getAuthStatus',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                    })
                    if(userData.status>=300){
                        navigate('/login')
                        alert("Session over ! Please Log in again")
                    }
                    else{
                        const data=await userData.json();
                        setloggedInUser(data);
                        console.log(data)
                    };
            } catch (error) {
                console.log(error);
                alert("Some error occured while checking user authoriazation")
            }
            }
            getUserData()
    }, [])

    useEffect(() => {
      setloggedInUser(loggedInUser)
    }, [setloggedInUser])
    
    
    

    const items=[
        {
            name: "Home",
            href: "#"
        },
        {
            name: "Services",
            href: "#"
        },
        {
            name: "About Us",
            href: "#"
        },
    ]
    const [isLoggedIn, setisLoggedIn] = useState(false)
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
                        {
                        items.map((item, index)=><NavLink to={item.href} key={index}><li className="navList" >{item.name}</li></NavLink>)
                        }
                    </ul>
                </div>
                <div className="flex userProf w-[20%] justify-end">
                        
                        {{loggedInUser}?
                        (<h2>{loggedInUser?.name.toUpperCase()}</h2>)
                        :
                        (<button type="button" className="bg-[#0d0d0d] rounded-md px-3 py-2 hover:bg-[#353535]">
                            SIGN UP / LOGIN
                        </button>)
                        }
                        
                </div>
            </div>
        </div>
    </>
  )
}

export default NavBar