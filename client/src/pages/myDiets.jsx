import { useEffect, useState } from "react";
import SidebarItem from "../components/sidebarItem.jsx";

// const dietPlans = [
// 	{
// 		name: "Diet 1",
// 		plan: "#"
// 	},
// 	{
// 		name: "Diet 2",
// 		plan: "#"
// 	},
// 	{
// 		name: "Diet 3",
// 		plan: "#"
// 	},
// ]
const MyDiets = () => {

    const [dietPlans, setDiet] = useState([]);
    // const Fetch = () => {

    useEffect(() => {
        const fetchDiet = async () => {
            await fetch("http://localhost:9000/api/v1/diet/dietList")
            .then(async (res) => {
                // console.log(res.json())
                let x = await res.json();
                setDiet( x );
            })
            .catch((err) => {
                console.log(err);
            })
        }

        fetchDiet();
    }, []);
    // };

    var sidebarItems = dietPlans["data"]?.map((diet, index) => {
        return <SidebarItem key={diet.name} name={diet.name} index={index} />;
    });
	return (
		<div>
			<div className="sidebar fixed top-10 bottom-0 mt-6 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
				<div className="text-gray-100 text-xl">
					<div className="p-2.5 mt-1 flex items-center">
						<i className="bi bi-egg bg-blue-600"></i>
						<h1 className="font-bold text-gray-200 text-[18px] ml-3">My Diets</h1>
					</div>
					<div className="my-2 bg-gray-600 h-[1px]"></div>
				</div>

				{sidebarItems}
				<div className="my-4 bg-gray h-[1px]">hdtyuh</div>
			</div>
		</div>
	);
};

export default MyDiets;
