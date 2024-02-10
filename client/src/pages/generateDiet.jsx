import React, { useState } from "react";


const GenerateDiet = () => {

  const [dietPlan, setDietPlan] = useState("kha le")
  const [formData, setFormData] = useState({})
  const handleInput=(e)=>{
    const field=e.target.name
    const value=e.target.value
    const attr={
      field:value
    }
    setFormData(
      {...formData, ...attr}
    )
    console.log(formData)
  }

  return (
    <>
      <div className="pt-16 bg-[#0d0d0d] flex flex-row">
        <div className="leftList overflow-y-hidden h-[100vh] flex flex-col items-center  w-[25%] bg-[##171717]">
          <div className="formForDiet p-10">
            <form method="POST" className=" flex flex-col gap-6">
              <div className="">
                <label className="text-white" htmlFor="name">Name</label><br/>
                <input onChange={(e)=>handleInput(e)} className="py-1 px-4 w-[16em] rounded-md focus:outline-none" type="text" />     
              </div>                         
              <div className="">
                <label className="text-white" htmlFor="name">Height (cms)</label><br/>
                <input onChange={(e)=>handleInput(e)} className="py-1 px-4 w-[16em] rounded-md " type="text" />     
              </div>                         
              <div className="">
                <label className="text-white" htmlFor="name">Weight (kgs)</label><br/>
                <input onChange={(e)=>handleInput(e)} className="py-1 px-4 w-[16em] rounded-md " type="text" />     
              </div>                         
              <div className="">
                <label className="text-white" htmlFor="name">Gender</label><br/>
                <select name="" id="" className="w-[11em]">
                  <option value="">Male</option>
                  <option value="">Female</option>
                </select>     
              </div>                         
              <div className="">
                <label className="text-white" htmlFor="name">Food Source</label><br/>
                <select name="" id="" className="w-[11em]">
                  <option value="">Veg</option>
                  <option value="">Non-Veg</option>
                </select>     
              </div>                         
              <div className="">
                <label className="text-white" htmlFor="name">Total Calories</label><br/>
                <input onChange={(e)=>handleInput(e)} className="py-1 px-4 w-[16em] rounded-md " type="text" />     
              </div>                         
              <div className="">
                <label className="text-white" htmlFor="name">Fitness Goal</label><br/>
                <select name="" id="" className="w-[11em]">
                  <option value="">Fat loss</option>
                  <option value="">Lean Bulk</option>
                  <option value="">Weight Gain</option>
                  <option value="">Weight Loose</option>
                  <option value="">Maintain Weight and Fat Loss</option>
                </select>
              </div>
              <div className="generateBtn flex flex-row w-[100%] h-[15%] justify-center items-center">
                <button className=" py-2 px-4 rounded-md text-white bg-[#171717] hover:bg-[#17171779]">
                  GENERATE
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="rightList w-[75%] h-[100vh] p-4 flex flex-col">
          <div className="inpText w-[100%] h-[100%]">
            <textarea
              name=""
              id=""
              value={dietPlan}
              cols="30"
              rows="10"
              className="h-[100%] w-[100%] border-[#c038ff] focus:outline border-4 bg-[#171717] rounded-xl p-4 text-white"
              readOnly={true}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateDiet;
