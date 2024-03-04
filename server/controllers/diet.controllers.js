import { asyncHandler } from "../utils/asyncHandler.js";
import { dietModal } from "../models/diet.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { apiError } from "../utils/apiError.js"
import mongoose from "mongoose"; 
import { userModal } from "../models/user.modal.js";

const getAllDiets = asyncHandler(async(req, res) => {
    dietModal.showAllDiet(
        (dbRes) => { 
          return res.status(200).json(new ApiResponse(200,dbRes,"Diet retrieved successfully"))
        },
        (dbErr) => {
            // throw new apiError(400,"error while fetching diets from db",[dbErr])
			return res.status(400).json(new ApiResponse(400,{},`error while fetching diets from db ${dbErr}`))
          }
    );
})

const getDietById = asyncHandler(async (req, res) => {
    let reqID = req.params.reqID;
    // console.log(reqID)
    if (!mongoose.Types.ObjectId.isValid(reqID)) {
      res.status(400);
      res.json({ message: "Record does not exist" });
      res.end();
      return;
    }
    dietModal.findDietByID(
      reqID,
      (dbRes) => {
        if (dbRes) {
          res.send(dbRes);
        } else {
          res.status(404);
          res.json({ message: "Record does not exist" });
        }
      },
      (dbErr) => {
        res.status(400);
        res.json({ name: dbErr.name, message: dbErr.message });
      },
    );
})

const addDiet = asyncHandler(async(req, res) => {
	const newDiet = req.body;
	const user=req.user

	// console.log(newDiet)
	const diet=await dietModal.addNewDiet(newDiet)

	if(!diet){
		// throw new apiError(502, "could not add deit to db from model method")
		return res.status(502).json(new ApiResponse(502,{}, "could not add deit to db from model method"))
	}

	// Adding the workoutID to user's workout array
	user.diets.push(diet._id);

	const newUser=await userModal.findByIdAndUpdate(
        user._id,
        {
            $set: {
                diets:user.diets
            }
        },
        {
            new:true
        }
    )

	if(!newUser){
		// throw new apiError(501, "cannot add diet in userSchema")
		return res.status(501).json(new ApiResponse(501,{}, "cannot add diet in userSchema"))
	}

	res
	.status(201)
	.json(
		new ApiResponse(201,newUser.diets,"added diet in user diet list")
	)
});

const updateDiet = asyncHandler(async(req, res) => {
	console.log("Updating Diet");
	let reqID = req.params.reqID;
	let newDiet = req.body;
	console.log(reqID + " " + newDiet);

	if (!mongoose.Types.ObjectId.isValid(reqID)) {
	  res.status(400);
	  res.send({ message: "Record does not exist" });
	  res.end();
	  return;
	}
  
	dietModal.updateDiet(
	  reqID,
	  newDiet,
	  (dbRes) => {
		if (dbRes) {
		  res.send({ message: "Record updated successfully" });
		} else {
		  res.status(400);
		  res.send({ message: "Record does not exist" });
		}
	  },
	  (dbErr) => {
		res.status(400);
		res.send({ name: dbErr.name, message: dbErr.message });
	  },
	  res
	);
})

const deleteDiet = asyncHandler( async(req, res) => {
	let reqID = req.params.reqID;

	if (!mongoose.Types.ObjectId.isValid(reqID)) {
	  res.status(400);
	  res.send({ message: "Record does not exist" });
	  res.end();
	  return;
	}
  
  dietModal.deleteDiet(
	  reqID,
	  (dbRes) => {
		if (dbRes) {
		  res.send({ message: "Record deleted successfully" });
		} else {
		  res.status(400);
		  res.send({ message: "Record does not exist" });
		}
	  },
	  (dbErr) => {
		res.status(400);
		res.send({ name: dbErr.name, message: dbErr.message });
	  },
	  res
	);
})

export {getAllDiets, getDietById, addDiet, updateDiet, deleteDiet};