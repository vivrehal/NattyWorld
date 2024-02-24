import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
	const [user, setUser] = useState({});

	const getUserData = async () => {
		await fetch("/api/v1/users/getAuthStatus", {
			method: "POST",
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
		getUserData();
	}, [user]);

	const updateUserData = () => {
		const newWeight = document.getElementById("weight")?.value || user.weight;
		const newHeight = document.getElementById("height")?.value || user.height;
		let newUser = user;
		newUser.weight = newWeight;
		newUser.height = newHeight;
		fetch("/api/v1/users/updateUser/" + user._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
			.then(async (res) => {
				if (res.status > 299) {
					console.log("Failed to update user");
				} else {
					alert("User updated successfully");
				}
			})
			.catch((err) => {
				console.log(err);
			});
		setUser(newUser);
	}
	return (
		<div className="flex">
			{/* User Details */}
			<div
				className="sidebar flex-box mt-16 lg:left-0 w-[25%] overflow-y-auto text-center bg-black
				border-2 border-white z-10 rounded-lg m-8  shadow shadow-white-100"
			>
				<div className="text-gray-100 text-xl">
					<div className="p-2.5 mt-1 flex items-center">
						<h1 className="font-bold text-gray-200 text-[22px] mx-auto border-b-2 w-[100%] p-5 ">My Profile</h1>
					</div>
					<div className="userData text-gray-200 text-[18px] mx-auto">
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] ">
								<b className="w-[30%]">Name: </b>
								{user.name}
							</span>
						</div>
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] ">
								<b className="w-[30%]">Username: </b>
								{user.username}
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

			{/* User Profile Updation Form */}
			<div className="updation-form w-[70%] mt-16 items-center">
				<h1 className="font-bold text-center text-gray-200 text-[30px]">Profile Updation Form</h1>
				<br />
				<form className="ml-8 align-middle w-[90%]">
					{/* Height Input */}
					<div className="p-2.5 mt-1 flex items-center">
						<label htmlFor="height" className="text-gray-200 text-[18px] w-[10%]">
							Height:
						</label>
						<input type="number" id="height" name="height" 
								className="text-gray-200 text-[18px] bg-black border border-white" 
								defaultValue={user.height} min={50}/>
					</div>

					{/* Weight Input */}
					<div className="p-2.5 mt-1 flex items-center">
						<label htmlFor="weight" className="text-gray-200 text-[18px] w-[10%]">
							Weight:
						</label>
						<input type="number" id="weight" name="weight" 
								className="text-gray-200 text-[18px] bg-black border border-white" 
								defaultValue={user.weight} min={20}/>
					</div>
				</form>
					<button className="ml-auto py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]" 
					onClick={updateUserData}> Update </button>
			</div>
		</div>
	);
};

export default MyProfile;
