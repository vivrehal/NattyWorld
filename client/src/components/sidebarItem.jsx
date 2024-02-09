const sidebarItem = (props) => {
	return (
		<div>
			<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
				<span className="text-[15px] ml-4 text-gray-200 font-bold">{props.name}</span>
			</div>
		</div>
	);
};

export default sidebarItem;