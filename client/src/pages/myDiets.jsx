import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";
import BodyTextArea from "../components/BodyTextArea.jsx";
import Loading from "../components/Loading.jsx";

const MyDiets = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [dietPlans, setDiet] = useState([]);
	const [activeIndex, setIndex] = useState(0);

	const fetchDietsArray = async () =>{
		return await fetch("https://nattyworld-server.onrender.com/api/v1/users/getUserDiets",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ accessToken: localStorage.getItem("accessToken") }),
								
			})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return data["diets"];
			});
	}
	useEffect(() => {
		setIsLoading(true);
		const fetchDiet = async () => {
			const newDietPlans = await fetchDietsArray();
			setDiet(newDietPlans);
		};
		fetchDiet();
		setIsLoading(false);
	}, []);
	
	const changeActiveIndex = (newIndex) => {
		setIndex(newIndex);
	}
	var sidebarItems = dietPlans?.map((diet, index) => {
		return <SidebarItem key={diet.name} name={diet.name} index={index} changeIndex={changeActiveIndex}/>;
	});
	const getPlanName = () => {
		// console.log()
		if(dietPlans != undefined && dietPlans != null && dietPlans.length > 0) {
			return dietPlans[activeIndex]?.name;
		}

		return "No Diet Plan added yet!";
	}
	const getPlanBody = () => {
		if(dietPlans != undefined && dietPlans != null) {
			return <BodyTextArea plan={dietPlans[activeIndex]?.plan}/>;
		}

		return "";
	}


	return (
		<>
		{isLoading && <Loading/>}
		<div className="flex">
			{/* SideBar */}
			<div
				className="sidebar flex-box mt-16 bottom-0 lg:left-0 w-[20%] overflow-y-auto text-center bg-black
				border-r-2 border-white z-10"
			>
				<div className="text-gray-100 text-xl">
					<div className="p-2.5 mt-1 flex items-center"> 
						<h1 className="font-bold text-gray-200 text-[18px]">My Diets</h1>
					</div>
				</div>
				{/* Diet Plan's Names in the sidebar */}
				{sidebarItems}
			</div>
			{/* Diet Display */}
			<div
				className="flex-grow overflow-auto mt-20 ml-auto mr-auto bg-black text-gray-200 text-[18px] w-[72%] h-[100vh] "
				// style={{ marginLeft: "20%" }}
			>
				{/* Content of the diet display */}
				<h1 className="font-bold text-center text-gray-200 text-[30px]">{getPlanName()}</h1>
				<div className="plan-body">
					{getPlanBody()}
				</div>
			</div>
		</div>
		</>
	);
};

export default MyDiets;
