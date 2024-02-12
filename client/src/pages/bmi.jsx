const calculate = () => {

}

const BMI = () => {
	return (
		<div className="flex mb-16">
			<div className=" flex-container mt-28 text-gray-100 text-xl mx-auto border-4 p-8 border-white w-[40%] text-center">
				<span className="input-box mx-auto font-extrabold p-4">BMI CALCULATOR</span>
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
							<input type="radio" name="gender" value="male" required/>
							Male
						</label>
						<label className="ml-4">
							<input type="radio" name="gender" value="female" required/>
							Female
						</label>
						<br />
						<input type="number" id="age" className="bg-black border-2 border-white h-7 text-white" required/>
						<br />
                        <input type="number" id="weight" className="bg-black border-2 border-white h-7 text-white" required/>
						<br />
                        <input type="number" id="height" className="bg-black border-2 border-white h-7 text-white" required/>
						<br />
                        <input type="number" id="neck" className="bg-black border-2 border-white h-7 text-white" required/>
						<br />
                        <input type="number" id="waist" className="bg-black border-2 border-white h-7 text-white" required/>
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
                <button type="submit" className="border-2 border-white p-2" onClick={calculate()}>Calculate</button>
			</div>
		</div>
	);
};

export default BMI;
