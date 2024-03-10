import React from 'react'

const Loading = () => {
  return (
    <div className="static-container h-screen fixed w-screen">
        <div className="flex justify-center items-center h-screen bg-[#000000cb]">
            <img src="https://media.tenor.com/_P-hM5Cm0z8AAAAi/fitness-gym.gif" className="w-[10%] rounded-[50%] bg-[#ffffff7d]" alt="Loading..." />
        </div>
    </div>
  )
}

export default Loading