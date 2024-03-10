import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import Loading from "../components/Loading";

const GymsNearby = () => {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [Gyms, setGyms] = useState([]);

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position?.coords?.latitude,
        long: position?.coords?.longitude,
      });
    });
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    if (coordinates?.lat && coordinates?.long) { 
      getGyms();
    }
  }, [coordinates]);

  const handleLoad = async () => {
    findCoordinates();
    await getGyms();
  };


  const getGyms = async () => {
    setIsLoading(true);
    const res = await fetch("https://nattyworld-server.onrender.com/api/v1/gyms/findNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: {
          lat: coordinates?.lat,
          long: coordinates?.long,
        },
        accessToken: localStorage.getItem("accessToken"),
      }),
    });
    if (res.status === 499) {
      setIsLoading(false);
      alert("Session Expired");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
      return;
    }
    if (res.status >= 300) {
      setIsLoading(false);
      alert("Error fetching gyms");
      return;
    }
    console.log(coordinates);
    const data = await res.json();
    console.log(data);
    setGyms(data?.data?.results);
    console.log(Gyms);
    setIsLoading(false);
  };

 
const [filterByRating, setFilterByRating] = useState(null);
const [sortByName, setSortByName] = useState(null);

const filteredAndSortedGyms = useMemo(() => {
  let gymsToDisplay = Gyms;
  // Filter by rating
  if (filterByRating) {
    gymsToDisplay = gymsToDisplay.filter(gym => gym.rating >= filterByRating);
  }
  // Sort by name
  if (sortByName === 'asc') {
    gymsToDisplay = gymsToDisplay.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortByName === 'desc') {
    gymsToDisplay = gymsToDisplay.sort((a, b) => b.name.localeCompare(a.name));
  }
  return gymsToDisplay;
}, [Gyms, filterByRating, sortByName]);

return (
  <>
    {isLoading && <Loading/>}
    <div className="flex-col pt-16 bg-[#0d0d0d] flex lg:flex-row ">
      <div className="leftList lg:overflow-y-auto lg:h-[90vh] flex flex-col items-center w-[100%] lg:w-[20%] bg-[#171717] p-4">
        <h1 className="text-white text-xl">Filter & Sorting</h1>
        <div className="formForworkout p-10 text-white flex flex-row lg:flex-col gap-5 text-sm lg:text-lg">
          <div className="filterByRating flex flex-col gap-2 ">
            <label htmlFor="rating">Filter by Rating:</label>
            <select
              className="px-10 text-black rounded-md"
              id="rating"
              value={filterByRating}
              onChange={e => setFilterByRating(Number(e.target.value))}
            >
              <option value="">All</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
              <option value="2">2+</option>
              <option value="1">1+</option>
            </select>
          </div>
          <div className="sortByName filterByRating flex flex-col gap-2">
            <label htmlFor="sort">Sort by Name:</label>
            <select
              className="px-10 text-black rounded-md"
              id="sort"
              value={sortByName}
              onChange={e => setSortByName(e.target.value)}
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="rightList w-[100%] h-[90vh] p-4 flex flex-col">
        <div className="inpText w-[100%] h-[90%] flex flex-col">
          <h2 className="text-3xl font-bold text-white pb-8 self-center">
            Gyms Nearby
          </h2>
          <div className="list_gyms h-[100%] ">
            <ul className="flex flex-row justify-evenly flex-wrap gap-4 w-[100%] h-[100%] overflow-y-auto">
              {filteredAndSortedGyms.map((gym, index) => {
                return (
                  <li
                    key={index}
                    className="text-white text-lg py-2 w-[40%] h-[50%]"
                  >
                    <a
                      target="blank"
                      href={`https://www.google.co.in/search?q=${gym?.name?.split().concat()}&sca_esv=0dcc3d4151cae03d&sxsrf=ACQVn09IwIT1TuAuUPgEjVPPHQ17kmT0WA%3A1709139804547&source=hp&ei=XGffZZ6SHa6yvr0P6tKM2As&iflsig=ANes7DEAAAAAZd91bLRmUzaBaXpq8tspihO1D7fEBXKj&ved=0ahUKEwiesKv3wc6EAxUuma8BHWopA7sQ4dUDCBU&uact=5&oq=fit2fight&gs_lp=Egdnd3Mtd2l6IglmaXQyZmlnaHQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI1jZQuhJYvzJwAngAkAEAmAHyAaAB7w-qAQUwLjQuNrgBA8gBAPgBAZgCDKACwhCoAgrCAgcQIxjqAhgnwgINEC4YxwEY0QMY6gIYJ8ICChAjGIAEGIoFGCfCAgQQIxgnwgIREC4YgAQYsQMYgwEYxwEY0QPCAgsQABiABBixAxiDAcICChAAGIAEGIoFGEPCAhAQLhiABBiKBRhDGMcBGNEDwgIWEC4YgAQYigUYQxixAxiDARjHARjRA8ICEBAAGIAEGIoFGEMYsQMYgwHCAhAQLhiABBiKBRhDGLEDGIMBwgINEAAYgAQYFBiHAhixA8ICDRAAGIAEGIoFGEMYsQPCAg0QLhiABBiKBRhDGOUEwgIIEAAYgAQYsQPCAggQLhiABBjlBMICCxAuGIAEGMcBGK8BwgIKEAAYgAQYChixA8ICDRAuGIAEGAoYsQMYgwHCAgcQABiABBgKwgINEC4YgAQYChjHARivAcICCBAAGIAEGKIEmAMJkgcFMi4zLjc&sclient=gws-wiz`}
                    >
                      <Cards gym={gym} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>

  );
};

export default GymsNearby;
