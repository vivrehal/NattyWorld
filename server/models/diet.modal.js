import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const dietSchema = new mongoose.Schema(
{
    name : {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type : String, 
        unique : true,
        required : true
    }
},{
    timestamps:true
})

const dietModal = new mongoose.model("Diet", dietSchema);

dietModal.showAllDiet = (successCallBack, errorCallBack, res) => {
    dietModal.find()
        .then(
            (dbRes) => {successCallBack(dbRes)},
            (dbErr) => {errorCallBack(dbErr)}
        )
        .catch((error) => {
            // exceptionHandler
            // console.log(error);
            return res.status(400).json(new apiError(501, "error while fetching diets from db", [error]))
        })
}

dietModal.findDietByID = (reqID, successCallBack, errorCallBack) =>{
    dietModal.findById(reqID)
    .then(
      (dbRes) => {
        successCallBack(dbRes);
      },
      (dbErr) => {
        errorCallBack(dbErr);
      }
    )
    .catch((error) => {
      exceptionHandler(res, error);
    });
}

dietModal.addNewDiet = async(newDiet) => {
    // try {
    //   console.log("New Diet:")
    //   console.log(newDiet)
    //   const diet=dietModal.create(newDiet)
    //   .then((dbRes) => {
    //       console.log("Diet:")
    //       console.log(dbRes)
    //   })
    //     if(!diet || diet == null){
    //         return {msg: "Could not add diet in db"}
    //     }
    //     return diet
    // } catch (error) {
    //     return {msg: "Error while adding diet in db"}
    // }

    try {
      const diet=await dietModal.create(newDiet)
      if(!diet){
          // throw new apiError(501, "could not add diet in db")
          return { msg:"could not add diet in db"}
      }
      return diet
} catch (error) {
  console.log(error);
  return (new ApiResponse(501,{}, "could not add diet in db"))
}
}


dietModal.updateDiet = (reqID, update, successCallBack, errorCallBack, res ) => {
    dietModal.findByIdAndUpdate(reqID, update)
      .then(
        (dbRes) => {
          successCallBack(dbRes);
        },
        (dbErr) => {
          errorCallBack(dbErr);
        }
      )
      .catch((error) => {
        exceptionHandler(res, error);
      });
};

dietModal.deleteDiet = (reqID, successCallBack, errorCallBack, res) => {
    dietModal.findByIdAndDelete(reqID)
      .then(
        (dbRes) => {
          successCallBack(dbRes);
        },
        (dbErr) => {
          errorCallBack(dbErr);
        }
      )
      .catch((error) => {
        exceptionHandler(res, error);
      });
};

export { dietModal };