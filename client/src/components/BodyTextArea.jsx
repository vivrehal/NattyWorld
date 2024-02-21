const BodyTextArea = (props) => {
	return (
		<>
			<textarea
				name=""
				id=""
				value={props.plan}
				cols="30"
				rows="10"
				className="h-[100%] w-[100%] overflow-y-auto resize-none border-none focus:outline-none border-4 bg-[#171717] rounded-xl p-4 text-white"
				readOnly={true}
			></textarea>
		</>
	);
};

export default BodyTextArea;
