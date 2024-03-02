import React from 'react'

const Cards = (props) => {
  return (
    <>
      <div className="container_gyms flex flex-col justify-center items-center bg-[#171717] pb-3 px-3 pt-1 rounded-lg text-white w-[100%] h-[100%]">
          <div className="inside_gymContainer w-[100%]">
            <h1 className="gymTitle font-bold text-xl my-3">
              {props.gym?.name}
            </h1>
            <p className="gymPhoto">
              <img src={props.gym?.icon} alt="No Preview Available" />
            </p> 
            <p className="gymRating my-3">
              Rating: {props.gym?.rating} ({props.gym?.user_ratings_total})
            </p>
            <p className="gymTime">
              {props.gym?.opening_hours?.open_now==true?"OPEN":"CLOSED"}
            </p>

          </div>
      </div>
    </>
  )
}

export default Cards