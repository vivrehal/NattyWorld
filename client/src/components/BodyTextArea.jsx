import PropTypes from 'prop-types';

const BodyTextArea = (props) => {
	return (
		<div className="w-[100%]">
			<textarea
				name=""
				id=""
				value={props.plan}
				cols="60"
				rows="23"
				className="h-[100%] ml-10 w-[90%] overflow-y-auto resize-none border-none focus:outline-none border-4 bg-[#171717] rounded-xl p-4 text-white"
				readOnly={true}
			></textarea>
		</div>
	); 
};

BodyTextArea.propTypes = {
	plan: PropTypes.string,
};


export default BodyTextArea;
