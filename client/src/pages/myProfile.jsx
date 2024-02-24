import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	const getUserData = async () => {
		await fetch("/api/v1/users/getAuthStatus", {
            method: "POST"
        })
			.then(async (res) => {
				if(res.status > 299) navigate("/login");
				let x = await res.json();
				setUser(x);
			})
			.catch((err) => {
				console.log(err);
			});
	};
    
    useEffect(() => {
        getUserData();
    }, []);


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
	return (
		<div className="flex">
			{/* SideBar */}
			<div
				className="sidebar flex-box mt-16 bottom-0 lg:left-0 w-[25%] overflow-y-auto text-center bg-black
				border-2 border-white z-10 rounded-lg m-8 ">
				<div className="text-gray-100 text-xl">
					<div className="p-2.5 mt-1 flex items-center">
						<h1 className="font-bold text-gray-200 text-[22px] mx-auto border-b-2 w-[100%]">My Profile</h1>
					</div>
					<div className="userData text-gray-200 text-[18px] mx-auto">
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Name: </b>{user.name}</span>
						</div>
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Username: </b>{user.username}</span>
						</div>

						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Email:</b> {user.email}</span>
						</div>
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Age:</b> {getAge(user.dob)}</span>
						</div>
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Current Weight:</b> {user.weight}</span>
						</div>
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Height:</b> {user.height}</span>
						</div>
						
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Saved Workouts: </b>{user.workouts?.length || "No workouts saved yet"}</span>
						</div>
						<div className="p-2.5 mt-1 flex items-center">
							<span className="text-gray-200 text-[18px] "><b className="w-[30%]">Saved Diets: </b>{user.diets?.length || "No diets saved yet"}</span>
						</div>

						
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
