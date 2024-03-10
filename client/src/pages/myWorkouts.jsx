import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";
import BodyTextArea from "../components/BodyTextArea.jsx";
import Loading from "../components/Loading.jsx";

const MyWorkouts = () => {
	const [workoutPlans, setWorkout] = useState([]);
	const [activeIndex, setIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);	

	const fetchWorkoutsArray = async () =>{
		return await fetch("https://nattyworld-server.onrender.com/api/v1/users/getUserWorkouts",{
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
				return data["workouts"];
			});
	}
	useEffect(() => {
		setIsLoading(true);
		const fetchWorkout = async () => {
			const newWorkoutPlans = await fetchWorkoutsArray();
			setWorkout(newWorkoutPlans);
		};

		fetchWorkout();
		setIsLoading(false);
	}, []);
	// };
	
	const changeActiveIndex = (newIndex) => {
		setIndex(newIndex);
	}
	var sidebarItems = workoutPlans?.map((workout, index) => {
		return <SidebarItem key={workout.name} name={workout.name} index={index} changeIndex={changeActiveIndex}/>;
	});
	const getPlanName = () => {
		// console.log()
		if(workoutPlans != undefined && workoutPlans != null && workoutPlans.length > 0) {
			return workoutPlans[activeIndex]?.name;
		}

		return "No Workout Plan added yet!";
	}
	const getPlanBody = () => {
		if(workoutPlans != undefined && workoutPlans != null) {
			return workoutPlans[activeIndex]?.plan;
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
						<h1 className="font-bold text-gray-200 text-[18px]">My workouts</h1>
					</div>
				</div>
				{/* workout Plan's Names in the sidebar */}
				{sidebarItems}
			</div>
			{/* workout Display */}
			<div
				className="flex-grow overflow-auto mt-20 bg-black text-gray-200 text-[18px] w-[72%] h-[90vh] "
				// style={{ marginLeft: "20%" }}
			>
				{/* Content of the workout display */}
				<h1 className="font-bold mx-auto text-center text-gray-200 text-[30px]">{getPlanName()}</h1>
				<BodyTextArea plan={getPlanBody()} />
			</div>
		</div>
		</>
	);
};

export default MyWorkouts; 
