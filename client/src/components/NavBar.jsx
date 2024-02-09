import React,{useState} from 'react'

const NavBar = () => {

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
        <div className="flex flex-row bg-black h-16 text-slate-50 w-[100vw] ">
            <div className="flex flex-row px-3 py-2 justify-between w-[100vw] items-center">
                <div className="siteName w-[20%]">
                    <h1 className="font-extrabold font-sans">NattyWorld</h1>
                </div>
                <div className="pageList w-[50%]">
                    <ul className="flex list-none flex-row justify-center gap-16">
                        {
                        items.map((item, index)=><li className="navList" key={index}>{item.name}</li>)
                        }
                    </ul>
                </div>
                <div className="flex userProf w-[20%] justify-end">
                        
                        {!{isLoggedIn}?
                        (<h2>kjh</h2>)
                        :
                        (<button type="button" className="bg-black rounded-md px-3 py-2 hover:bg-[#121212]">
                            Signup/Login
                        </button>)
                        }
                        
                </div>
            </div>
        </div>
    </>
  )
}

export default NavBar