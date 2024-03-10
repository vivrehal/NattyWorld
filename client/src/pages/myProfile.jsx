import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../components/sidebarItem.jsx";
import workoutImg from "../assets/workout.png";
import Loading from "../components/Loading.jsx";

function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

const MyProfile = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState({});
	const [activePage, setActivePage] = useState("My Profile");

	const sidebarItems = ["My Profile", "Update Profile"];
	const getUserData = async () => {
		await fetch("https://nattyworld-server.onrender.com/api/v1/users/getAuthStatus", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ accessToken: localStorage.getItem("accessToken") }),
		})
			.then(async (res) => {
				if (res.status > 299) navigate("/login");
				let x = await res.json();
				
				setUser(x);
			})
			.catch((err) => {
				
				console.log(err);
			});
		
	};

	useEffect(() => {
		setIsLoading(true);
		getUserData();
		setIsLoading(false);
	}, [activePage]);
	// useEffect(() => {}, [activePage]);

	const updateUserData = () => {
		const newWeight = document.getElementById("weight")?.value || user.weight;
		const newHeight = document.getElementById("height")?.value || user.height;
		const oldPassword = document.getElementById("Old Password")?.value || "None";
		if(oldPassword == "None") {
			alert("Please enter your current password to update your profile");
			return;
		}
		const newPassword = document.getElementById("New Password")?.value || "None";
		let newUser = user;
		newUser.weight = newWeight;
		newUser.height = newHeight;
		newUser.oldpassword = oldPassword;	
		newUser.newpassword = newPassword;	
		setIsLoading(true);
		fetch("https://nattyworld-server.onrender.com/api/v1/users/updateProfile/" + user._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
			.then(async (res) => {
				if (res.status > 299) {
					await res.json().then((data) => {
						setIsLoading(false);
						alert("Failed to update user :" + data.message);
					});
					
				} else {
					setIsLoading(false);
					alert("User updated successfully");
				}
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err);
			});
		setIsLoading(false);
		setUser(newUser);
	};

	const getSidebarItems = () => {
		return sidebarItems.map((item) => {
			return <SidebarItem key={item} name={item} index={item} changeIndex={changeActivePage} />;
		});
	};

	// Changing Active Page
	const changeActivePage = (newPage) => {
		setActivePage(newPage);
	};

	const getActivePage = () => {
		
		if (activePage === "My Profile") {
			{isLoading && <Loading/>}
			// User Profile
			return (
				<>
					
					<div
						className="sidebar flex-box mt-20 lg:left-0 w-[50%%] overflow-y-auto text-center bg-black
				border-2 border-white z-10 rounded-lg m-8 ml-20  shadow shadow-white-100 p-8 md:w-[35]% z-0"
					>
						<div className="text-gray-100 text-xl">
							<div className="p-2.5 flex items-center">
								<h1 className="font-bold text-gray-200 text-[40px] mx-auto border-b-2 w-[100%] p-5 ">
									My Profile
								</h1>
							</div>
							<div className="userData text-gray-200 text-[18px] mx-auto">
								<div className="p-2.5 mt-1 flex items-center">
									<h1 className=" text-[38px] font-extrabold">{user.name}</h1> 
								</div>
								<div className=" pl-2 flex items-center">
									<span className="text-gray-200 text-[18px] ">
										<b className="w-[30%]">@{user.username}</b>
									</span>
								</div>

								<div className="p-2.5 mt-1 flex items-center">
									<span className="text-gray-200 text-[18px] ">
										<b className="w-[30%]">Email:</b> {user.email}
									</span>
								</div>
								<div className="p-2.5 mt-1 flex items-center">
									<span className="text-gray-200 text-[18px] ">
										<b className="w-[30%]">Age:</b> {getAge(user.dob)}
									</span>
								</div>
								<div className="p-2.5 mt-1 flex items-center">
									<span className="text-gray-200 text-[18px] ">
										<b className="w-[30%]">Current Weight: </b> {user.weight} Kgs
									</span>
								</div>
								<div className="p-2.5 mt-1 flex items-center">
									<span className="text-gray-200 text-[18px] ">
										<b className="w-[30%]">Height:</b> {user.height} cms
									</span>
								</div>

								<div className="p-2.5 mt-1 flex items-center">
									<span className="text-gray-200 text-[18px] ">
										<b className="w-[30%]">Saved Workouts: </b>
										{user.workouts?.length || "No workouts saved yet"}
									</span>
								</div>
								<div className="p-2.5 mt-1 flex items-center">
									<span className="text-gray-200 text-[18px] ">
										<b className="w-[30%]">Saved Diets: </b>
										{user.diets?.length || "No diets saved yet"}
									</span>
								</div>
							</div>
						</div>
					</div>

				</>
			);
		} else if (activePage === "Update Profile") {
			{isLoading && <Loading/>}
			// User Profile Updation Form
			return (
				<>
					{/* User Profile Updation Form */}
					<div className="updation-form w-[45%] p-14 mt-20 items-center border border-white z-10 rounded-lg ml-auto mb-24 shadow shadow-white-100">
						<h1 className="font-bold text-center text-gray-200 text-[35px] border-b-2 border-white">Profile Updation Form</h1>
						<br />
						<form className=" align-middle w-[90%] ml-4">
							{/* Height Input */}
							<div className=" mt-1 flex items-start">
								<label htmlFor="height" className="text-gray-200 text-[18px]">
									Height:
								</label>
								<input
									type="number"
									id="height"
									name="height"
									className="text-gray-200 text-[18px] bg-black border border-white ml-auto"
									defaultValue={user.height}
									min={50}
								/>
							</div>

							{/* Weight Input */}
							<div className="mt-1 flex items-center">
								<label htmlFor="weight" className="text-gray-200 text-[18px]">
									Weight:
								</label>
								<input
									type="number"
									id="weight"
									name="weight"
									className="text-gray-200 text-[18px] bg-black border border-white ml-auto"
									defaultValue={user.weight}
									min={20}
								/>
							</div>

							<div className="mt-1 flex items-center">
								<label htmlFor="Current Password" className="text-gray-200 text-[18px]">
									Current Password:
								</label>
								<input
									type="password"
									id="Old Password"
									name="Current Password"
									className="text-gray-200 text-[18px] bg-black border border-white ml-auto"
									min={20}
								/>
							</div>

							<div className="mt-1 flex items-center">
								<label htmlFor="New Password" className="text-gray-200 text-[18px]">
									New Password:
								</label>
								<input
									type="password"
									id="New Password"
									name="New Password"
									className="text-gray-200 text-[18px] bg-black border border-white ml-auto"
									min={20}
								/>
							</div>
							<div className="text-gray-200 text-[13px]"> (Leave empty if you don't wish<br/> to change your password)</div>
						</form>
						<div className=" flex justify-center mt-8">
							<button
								className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
								onClick={updateUserData}>
								Update
							</button>
						</div>
					</div>
				</>
			);
		}
	};
	return (
		<>
		{isLoading && <Loading/>}
		<div className="flex flex-col sm:flex-row">
			{/* SideBar */}
			<div className="sidebar mt-16 border-r-2 border-white">{getSidebarItems()}</div>
			<br />

			{/* Active Page */}
			{getActivePage()}

			<div className="  rightComtainer w-[40%]  flex-col items-center justify-center hidden md:flex">
				<img src={workoutImg} alt="Body Builders doing Workout" className="w-[100%]" />
			</div>
		</div>
		</>
	);
};

export default MyProfile;
