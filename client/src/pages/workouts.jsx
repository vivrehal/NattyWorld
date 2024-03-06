import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";
import BodyTextArea from "../components/BodyTextArea.jsx";

const Workouts = () => {
	const [workoutPlans, setWorkout] = useState([]);
	const [activeIndex, setIndex] = useState(0);
	useEffect(() => {
		const fetchWorkout = async () => {
			await fetch("https://nattyworld-server.onrender.com/api/v1/workouts/workoutList")
				.then(async (res) => {
					let x = await res.json();
					setWorkout(x["data"]);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchWorkout();
	}, []);
	// };
	
	const changeActiveIndex = (newIndex) => {
		setIndex(newIndex);
	}
	var sidebarItems = workoutPlans?.map((Workout, index) => {
		return <SidebarItem key={Workout.name} name={Workout.name} index={index} changeIndex={changeActiveIndex}/>;
	});
	const getPlanName = () => {
		// console.log()
		if(workoutPlans != undefined && workoutPlans != null) {
			return workoutPlans[activeIndex]?.name;
		}

		return "";
	}
	const getPlanBody = () => {
		if(workoutPlans) {
			console.log(workoutPlans[activeIndex]?.plan);
			return workoutPlans[activeIndex]?.plan;
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
						<h1 className="font-bold text-gray-200 text-[18px] mx-auto">Available Workouts</h1>
					</div>
				</div>
				{/* Workout Plan's Names in the sidebar */}
				{sidebarItems}
			</div>
      
			{/* Workout Display */} 
			<div
				className="flex-grow overflow-auto mt-20 bg-[#171717] text-gray-200 text-[18px] w-[72%] h-[90vh] "
				// style={{ marginLeft: "20%" }}
			>
				{/* Content of the Workout display */}
				<h1 className="font-bold text-center text-gray-200 text-[30px]">{getPlanName()}</h1>
				<BodyTextArea plan={getPlanBody()} />
			</div>
		</div>
	);
};

export default Workouts;
