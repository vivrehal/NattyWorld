import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";

const MyDiets = () => {
	const [dietPlans, setDiet] = useState([]);
	const [activeIndex, setIndex] = useState(0);
	useEffect(() => {
		const fetchDiet = async () => {
			await fetch("http://localhost:9000/api/v1/diet/dietList")
				.then(async (res) => {
					let x = await res.json();
					setDiet(x);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchDiet();
	}, []);
	// };

	var sidebarItems = dietPlans["data"]?.map((diet, index) => {
		return <SidebarItem key={diet.name} name={diet.name} index={index} />;
	});

	return (
		<div className="flex">
			{/* SideBar */}
			<div className="sidebar flex-box fixed top-10 bottom-0 mt-6 lg:left-0 w-[20%] overflow-y-auto text-center bg-black
				border-r-2 border-white ">
				<div className="text-gray-100 text-xl">
					<div className="p-2.5 mt-1 flex items-center">
						<h1 className="font-bold text-gray-200 text-[18px]">
							My Diets
						</h1>
					</div>
				</div>
				{/* Diet Plan's Names in the sidebar */}
				{sidebarItems}
			</div>
			{/* Diet Display */}
			<div className="flex-grow overflow-auto bg-gray-900 text-gray-200 text-[18px] w-[72%] h-[90vh]" style={{ marginLeft: "20%"}}>
				{/* Content of the diet display */}
				jhgfd3<br></br>
				erfg
			</div>
		</div>
	);
};

export default MyDiets;
