import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";

const Diets = () => {
	const [dietPlans, setDiet] = useState([]);
	const [activeIndex, setIndex] = useState(0);
	useEffect(() => {
		const fetchDiet = async () => {
			await fetch("http://localhost:9000/api/v1/diet/dietList")
				.then(async (res) => {
					let x = await res.json();
					setDiet(x["data"]);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchDiet();
	}, []);
	// };
	
	const changeActiveIndex = (newIndex) => {
		setIndex(newIndex);
	}
	var sidebarItems = dietPlans?.map((diet, index) => {
		return <SidebarItem key={diet.name} name={diet.name} index={index} changeIndex={changeActiveIndex}/>;
	});
	const getPlanName = () => {
		// console.log()
		if(dietPlans != undefined && dietPlans != null) {
			return dietPlans[activeIndex]?.name;
		}

		return "";
	}
	const getPlanBody = () => {
		if(dietPlans != undefined && dietPlans != null) {
			return dietPlans[activeIndex]?.plan;
		}

		return "";
	}


	return (
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
				// style={{ marginLeft: "20%" }}
			>
				{/* Content of the diet display */}
				<h1 className="font-bold mx-auto text-gray-200 text-[30px]">{getPlanName()}</h1>
				<div className="plan-body">
					{getPlanBody()}
				</div>
			</div>
		</div>
	);
};

export default Diets;
