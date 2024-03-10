import { useState, useEffect } from "react";
import BodyTextArea from "../components/BodyTextArea.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading.jsx";

function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return Number(age);
}

const GenerateDiet = () => {
	const navigate = useNavigate();

	const [dietPlan, setDietPlan] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		height: "",
		weight: "",
		gender: "",
		age: "",
		foodSource: "",
		fitnessGoal: "",
		protein: "",
		carbs: "",
		fats: "",
		otherPreferences: "",
		country: "",
		totalCalories: "",
	});

	const [currentUser, setcurrentUser] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const userCurrent=useSelector((state) => state.user);

	useEffect(() => {
		setcurrentUser(userCurrent);
	}, [userCurrent]);


	const handleInput = (e) => {
		console.log(formData);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

  const generateDietByAI = async () => {
	setIsLoading(true);
    const res = await fetch("https://nattyworld-server.onrender.com/api/v1/ai/generateDiet", {
    // const res = await fetch("https://localhost:9000/api/v1/ai/generateDiet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData,accessToken:localStorage.getItem("accessToken")}),
    });
    const response = await res.json();
    if (!response?.data?.dietPlan?.content) {
		setIsLoading(false);
      alert("Cannot fetch Diet Plan");
    }
    // console.log();
    setDietPlan(response?.data?.dietPlan?.content);
	setIsLoading(false);
  };

  const saveDiet = async () => {
	setIsLoading(true);	
	if(!dietPlan) return alert("Please generate diet plan first")
    const dietDetails={
      name:`${formData.fitnessGoal} | ${formData.foodSource} | ${formData.gender} | ${formData.totalCalories}`,
      plan : dietPlan
    }
    console.log(formData)
    const res = await fetch("https://nattyworld-server.onrender.com/api/v1/diet/addDiet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...dietDetails,accessToken:localStorage.getItem("accessToken")}),
    });
    const response = await res.json();

		if (!response?.data) {
			setIsLoading(false);
			alert("Cannot save diet Plan");
		} else{
			setIsLoading(false);
			alert("Diet Plan Saved Successfully");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await generateDietByAI(formData);
	};

	return (
		<>	
			{isLoading && <Loading/>}
			<div className="flex-col pt-16 bg-[#0d0d0d] flex lg:flex-row ">
				<div className="leftList lg:overflow-y-auto lg:h-[90vh] flex flex-col items-center w-[100%] lg:w-[35%] bg-[#171717]">
					<div className="formForDiet p-10">
						<h2 className="text-3xl font-bold text-white pb-8">Generate Your Diet</h2>
						<form method="POST" className=" flex flex-col gap-6">
							<div className="">
								<label className="text-white" htmlFor="name">
									Name
								</label>
								<br />
								<input
									name="name"
									onChange={(e) => handleInput(e)}
									className="py-1 px-4 w-[100%] rounded-md focus:outline-none"
									type="text"
									defaultValue={currentUser?.name}
								/>
							</div>
							<div className="">
								<label className="text-white" htmlFor="name">
									Height (cms)
								</label>
								<br />
								<input
									name="height"
									onChange={(e) => handleInput(e)}
									className="py-1 px-4 w-[100%] rounded-md "
									type="number"
									defaultValue={currentUser?.height}
								/>
							</div>
							<div className="">
								<label className="text-white" htmlFor="name">
									Weight (kgs)
								</label>
								<br />
								<input
									name="weight"
									onChange={(e) => handleInput(e)}
									className="py-1 px-4 w-[100%] rounded-md "
									type="number"
									defaultValue={currentUser?.weight}
								/>
							</div>
							<div className="">
								<label className="text-white" htmlFor="name">
									Gender
								</label>
								<br />
								<select
									name="gender"
									value={formData.gender}
									id=""
									className="py-1 px-4 w-[100%] rounded-md"
									onChange={(e) => handleInput(e)}
								>
									<option value="">Select Gender</option>
									<option value="male" defaultChecked>
										Male
									</option>
									<option value="female">Female</option>
								</select>
							</div>
							<div className="">
								<label className="text-white" htmlFor="name">
									Age
								</label>
								<br />
								<input
									name="age"
									onChange={(e) => handleInput(e)}
									className="py-1 px-4 w-[100%] rounded-md "
									type="number"
									defaultValue={Number(getAge(currentUser?.dob))}
								/>
							</div>
							<div className="">
								<label className="text-white" htmlFor="name">
									Total Calories
								</label>
								<br />
								<input
									name="totalCalories"
									onChange={(e) => handleInput(e)}
									className="py-1 px-4 w-[100%] rounded-md "
									type="number"
								/>
							</div>
							<div className="">
								<label className="text-white" htmlFor="name">
									Food Source
								</label>
								<br />
								<select
									name="foodSource"
									onChange={(e) => {
										handleInput(e);
									}}
									id=""
									className="py-1 px-4 w-[100%] rounded-md"
									value={dietPlan.foodSource}
								>
									<option value="">Select Food Source</option>
									<option value="veg">Veg</option>
									<option value="non veg">Non-Veg</option>
								</select>
							</div>

							<div className="">
								<label className="text-white" htmlFor="name">
									Fitness Goal
								</label>
								<br />
								<select
									name="fitnessGoal"
									id=""
									className="py-1 px-4 w-[100%] rounded-md"
									value={dietPlan.fitnessGoal}
									onChange={(e) => {
										handleInput(e);
									}}
								>
									<option value="fat loss">Fat Loss</option>
									<option value="lean bulk">Lean Bulk</option>
									<option value="weight gain">Weight Gain</option>
									<option value="weight loss">Weight Loss</option>
									<option value="Maintain Weight and Fat Loss">Maintain Weight and Fat Loss</option>
								</select>
							</div>

							<div className="">
								<h1 className="text-2xl text-white font-bold pb-3 pt-4">Macros :</h1>
								<div>
									<label className="text-white" htmlFor="name">
										Protein (gms)
									</label>
									<br />
									<input
										onChange={(e) => handleInput(e)}
										type="number"
										name="protein"
										id=""
										className="py-1 px-4 w-[100%] rounded-md"
									/>
								</div>
								<div>
									<label className="text-white" htmlFor="name">
										Carbs (gms)
									</label>
									<br />
									<input
										onChange={(e) => handleInput(e)}
										type="number"
										name="carbs"
										id=""
										className="py-1 px-4 w-[100%] rounded-md"
									/>
								</div>
								<div>
									<label className="text-white" htmlFor="name">
										Fats (gms)
									</label>
									<br />
									<input
										onChange={(e) => handleInput(e)}
										type="number"
										name="fats"
										id=""
										className="py-1 px-4 w-[100%] rounded-md"
									/>
								</div>
							</div>

							<div className="generateBtn flex flex-row w-[100%] h-[15%] justify-center items-center">
								<button
									onClick={(e) => {
										handleSubmit(e);
									}}
									className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
								>
									GENERATE
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="rightList w-[100%] h-[100vh] p-4 flex flex-col">
					<div className="inpText w-[100%] h-[90%]">
						<BodyTextArea plan={dietPlan} />
					</div>
					<div className="generateBtn flex flex-row w-[100%] h-[10%] justify-center items-center">
						<button
							onClick={(e) => {
								saveDiet();
							}}
							className=" py-2 px-4 rounded-md text-white bg-[#585858] hover:bg-[#00000079]"
						>
							ADD TO MY DIETS
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default GenerateDiet;
