
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const GymsNearby = () => {

  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({
  })

  const [Gyms, setGyms] = useState([])

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position?.coords?.latitude,
        long: position?.coords?.longitude
      })
    });
  
  }

  useEffect(() => {
    handleLoad();
  }, [setCoordinates])

  const handleLoad = async() => {
    findCoordinates();
    await getGyms();
  }


  const getGyms = async () => {  
    const res = await fetch("/api/v1/gyms/findNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: {
          lat: coordinates.lat,
          long: coordinates.long
        }
      })
    });
    if(res.status === 499) {
      alert("Session Expired");
      navigate("/login");
      return
    }
    if(res.status >= 300) {
      alert("Error fetching gyms");
      return
    }
    console.log(coordinates)
    const data = await res.json();
    console.log(data);
    setGyms(data?.data?.results);
    console.log(Gyms);
  }

  return (
    <>
      <div className="flex-col pt-16 bg-[#0d0d0d] flex lg:flex-row ">
        <div className="leftList overflow-y-auto h-[90vh] flex flex-col items-center w-[100%] lg:w-[35%] bg-[#171717]">
          <div className="formForworkout p-10">
            <h2 className="text-3xl font-bold text-white pb-8">Gyms Nearby</h2>
            <div className="list_gyms">
              <ul>
                {
                  Gyms?.map((gym, index) => {
                    return (
                      <li key={index} className="text-white text-lg py-2">
                        {gym.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="rightList w-[100%] h-[90vh] p-4 flex flex-col">
          <div className="inpText w-[100%] h-[90%]">

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
}

export default GymsNearby