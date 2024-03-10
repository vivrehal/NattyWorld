import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";
import BodyTextArea from "../components/BodyTextArea.jsx";
import Loading from "../components/Loading.jsx";

const Diets = () => {
	const [dietPlans, setDiet] = useState([]);
	const [activeIndex, setIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		const fetchDiet = async () => {
			await fetch("https://nattyworld-server.onrender.com/api/v1/diet/dietList")
				.then(async (res) => {
					let x = await res.json(); 
					setDiet(x["data"]);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchDiet();
		setIsLoading(false);
	}, []);
	// };
	
	const changeActiveIndex = (newIndex) => {
		setIndex(newIndex);
	}
	var sidebarItems = dietPlans?.map((diet, index) => {
		return <SidebarItem key={diet.name} name={diet.name} index={index} changeIndex={changeActiveIndex}/>;
	});
	const getPlanName = () => {
		if(dietPlans != undefined && dietPlans != null) {
			return dietPlans[activeIndex]?.name;
		}

		return "Undefined Diet Plan Name";
	}
	const getPlanBody = () => {
		if(dietPlans != undefined && dietPlans != null) {
			return <BodyTextArea plan={dietPlans[activeIndex]?.plan} /> ;
		}

		return "";
	}


	return (
		<>
		{isLoading && <Loading />}
		<div className="flex">
			{/* SideBar */}
			<div
				className="sidebar flex-box mt-16 bottom-0 lg:left-0 w-[20%] overflow-y-auto text-center bg-black
				border-r-2 border-white z-10"
			>
				<div className="text-gray-100 text-xl">
					<div className="p-2.5 mt-1 flex items-center">
						<h1 className="font-bold text-gray-200 text-[18px] mx-auto">Available Diets</h1>
					</div>
				</div>
				{/* Diet Plan's Names in the sidebar */}
				{sidebarItems}
			</div>
			{/* Diet Display */}
			<div
				className="flex-grow overflow-auto mt-20 bg-black text-gray-200 text-[18px] w-[72%] h-[90vh] "
			>
				{/* Content of the diet display */}
				<h1 className="font-bold text-center text-gray-200 text-[30px]">{getPlanName()}</h1>
				<div className="plan-body w-[100%] h-[100%]">
					{getPlanBody()}
				</div>
			</div>
		</div>
		</>
	);
};

export default Diets;
