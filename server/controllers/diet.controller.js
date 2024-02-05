import { asyncHandler } from "../utils/asyncHandler.js";
import { dietModal } from "../models/diet.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { apiError } from "../utils/apiError.js"
import mongoose from "mongoose";

const getAllDiets = asyncHandler(async(req, res) => {
    console.log("Getting Data");
    dietModal.showAllDiet(
        (dbRes) => {
          console.log("Got Data");
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


export {getAllDiets, getDietById, addDiet};