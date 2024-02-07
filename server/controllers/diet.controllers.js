import { asyncHandler } from "../utils/asyncHandler.js";
import { dietModal } from "../models/diet.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { apiError } from "../utils/apiError.js"
import mongoose from "mongoose";

const getAllDiets = asyncHandler(async(req, res) => {
    console.log("Getting Data");
    dietModal.showAllDiet(
        (dbRes) => {
          return res.status(200).json(new ApiResponse(200,dbRes,"Diet retrieved successfully"))
        },
        (dbErr) => {
            throw new apiError(400,"error while fetching diets from db",[dbErr])
          }
    );
})

const getDietById = asyncHandler(async (req, res) => {
    console.log("Getting Diet");
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
  console.log("Adding new Diet")
  let newDiet = req.body;
  dietModal.addNewDiet(
      newDiet,
      (dbRes) => {
        res.send(dbRes);
      },
      (dbErr) => {
        res.status(400);
        res.json({ name: dbErr.name, message: dbErr.message });
      }
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