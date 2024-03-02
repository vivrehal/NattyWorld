// import { useState } from "react";


const BMI = () => {

	// const [result, setResult] = useState("");

	const calculate = () => {
		const age = document.getElementById("age").value;
		const weight = document.getElementById("weight")?.value;
		const height = (document.getElementById("height")?.value)/100; 
		const neck = document.getElementById("neck")?.value;
		const waist = document.getElementById("waist")?.value;
		// Checking for Null values and NaN values
		if(!age || !weight || !height || !neck || !waist) {
			alert("Please fill out all the details correctly and try again");
			return ;
		}


		// Calculating BMI
		let bmiResult = "";
		let bmi = (weight/(height*height));
		bmi = Math.round(bmi*100)/100;   // Rounding off
		// Finding the BMI category for the user
		let category = "";
		if(bmi<18.5) category = "Underweight";
		else if(bmi < 25) category = "Normal";
		else if(bmi < 30) category = "Overweight";
		else category = "Obese";
				
		
		const resultElement = document.getElementById("results");
		
		bmiResult = "Your BMI Score is : <b>" + bmi + "</b><br/><br/>";
		bmiResult += "Based on your BMI Score you are in the <b>" + category + "</b> category<br/>";
		resultElement.innerHTML = bmiResult

		// Calculating Body Fats
		let bfp = 0; //Body Fat Percentage
		if(document.getElementById("male").checked) {
			if(age>=18){
				bfp = (1.20 * bmi) + (0.23 * age) - 16.2 ;
			}
			else{
				bfp = (1.51 * bmi) - (0.70 * age) - 2.2 
			}
		}
		else{
			if(age>=18){
				bfp = (1.20 * bmi) + (0.23 * age) - 5.4 
			}
			else{
				bfp = (1.51 * bmi) - (0.70 * age) + 1.4 
			}
		}

		bfp = Math.round(bfp*100)/100;  // Rounding off BFP
		let fatMass = (bfp * weight)/100;
		fatMass = Math.round(fatMass*100)/100; 
		let leanMass = weight - fatMass;
		leanMass = Math.round(leanMass*100)/100; 

		let fatResults = "Your Body Fat Percentage is : <b>" + bfp + "</b><br/>";
		fatResults += "Amount of Fat Mass : <b>" + fatMass + "</b> Kgs<br/>";
		fatResults += "Amount of Lean Mass : <b>" + leanMass + "</b> Kgs<br/>";
		resultElement.innerHTML += fatResults;


	}

	return (
		<>
		<div className="flex mb-16">
			<div className=" flex-container mt-28 text-white text-xl mx-auto border-4 p-8 border-white w-[40%] text-center">
				<span className="input-box mx-auto font-extrabold p-4">BMI/Fat CALCULATOR</span>
				<div className="grid grid-cols-12 mb-8">
					<div className="labels text-left col-span-5 ml-8  pt-4">
						Gender<br />
						Age<br />
						Weight<br />
						Height<br />
						Neck<br />
						Waist<br />
					</div>
					<div className="inputs text-left col-span-6  pt-4">
						<label>
							<input type="radio" name="gender" id="male" defaultChecked={true} />
							Male
						</label>
						<label className="ml-4">
							<input type="radio" name="gender"/>
							Female
						</label>
						<br />
						<input type="number" id="age" className="bg-black border-2 border-white h-7 text-white" defaultValue="25" required/>
						<br />
                        <input type="number" id="weight" className="bg-black border-2 border-white h-7 text-white" defaultValue="70" required/>
						<br />
                        <input type="number" id="height" className="bg-black border-2 border-white h-7 text-white" defaultValue="178" required/>
						<br />
                        <input type="number" id="neck" className="bg-black border-2 border-white h-7 text-white" defaultValue="50" required/>
						<br />
                        <input type="number" id="waist" className="bg-black border-2 border-white h-7 text-white" defaultValue="96" required/>
					</div>
					<div className="units text-right w-8 col-span-1  pt-4">
						<br />
						<br />
						Kgs
						<br />
						cm
						<br />
						cm
						<br />
						cm
					</div>
				</div>
                <button type="submit" className="border-2 border-white p-2" onClick={calculate}>Calculate</button>
			</div>
			<br/><br/>
		</div>
		<div>
			<div className="results text-white text-center mx-5 mb-12 text-xl" id="results"></div>

		</div>
		</>
	);
};

export default BMI;
