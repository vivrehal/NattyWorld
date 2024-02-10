import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";

const MyWorkouts = () => {
	const [workoutPlans, setWorkout] = useState([]);
	const [activeIndex, setIndex] = useState(0);
	const [user, setUser] = useState({});

	const fetchWorkoutByID = async (workoutID) =>{
		if(workoutID) return await fetch("/api/v1/workouts/workoutList/" + workoutID)
								.then((res) => {
									return res.json();
								});
	}
	useEffect(() => {
		const fetchWorkout = async () => {
			if(!user["workouts"]) return ;
			let workoutData = await user["workouts"];
			// console.log(data)
			const promise =  workoutData.map((ele) => {
				// workoutPlans.push(fetchworkoutByID(ele))
				// console.log(workoutPlans.slice(-1));forEach
				return fetchWorkoutByID(ele);
			});
			const resolvedworkoutPlans = await Promise.all(promise);
			setWorkout(resolvedworkoutPlans);
		};
		const login = async () => {
			const response = await fetch("/api/v1/users/login", {
				method: "POST",
				body : JSON.stringify({
					"usernameOrEmail" : "vivrehal",
					"password" : "qwertyyyy12@."				
				}),
				headers: {
					"Content-Type": "application/json"
				}
			});
			// console.log(await response.json())
			// .then((res) =>{
			// 	console.log(res)
			// 	return res
			// })
			// .then((res) => {
			// 	console.log(res)
			// })
			if(response.ok){
				let data = await response.json();
				// console.log(data["data"]["loggedInUser"])
				setUser(data["data"]["loggedInUser"])
			}
			fetchWorkout();
		}

		login()
		// fetchworkout();
	}, [user]);
	// };
	
	const changeActiveIndex = (newIndex) => {
		setIndex(newIndex);
	}
	var sidebarItems = workoutPlans?.map((workout, index) => {
		return <SidebarItem key={workout.name} name={workout.name} index={index} changeIndex={changeActiveIndex}/>;
	});
	const getPlanName = () => {
		// console.log()
		if(workoutPlans != undefined && workoutPlans != null) {
			return workoutPlans[activeIndex]?.name;
		}

		return "";
	}
	const getPlanBody = () => {
		if(workoutPlans != undefined && workoutPlans != null) {
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
				<h1 className="font-bold mx-auto text-gray-200 text-[30px]">{getPlanName()}</h1>
				<div className="plan-body">
					{getPlanBody()}
				</div>
			</div>
		</div>
	);
};

export default MyWorkouts;
