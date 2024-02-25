const sidebarItem = (props) => {
	return (
		<div>
			<div onClick={() => {console.log(props.index); props.changeIndex(props.index)}} className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
				<span className="text-[18px] ml-4 text-gray-200 font-bold mx-auto">{props.name.toUpperCase()}</span>
			</div>
		</div>
	);
};

export default sidebarItem;
