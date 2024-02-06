import mongoose from "mongoose";

const dietSchema = new mongoose.Schema(
{
    name : {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type : String, // Link of the pdf of the diet
        unique : true
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
            console.log(error);
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

dietModal.addNewDiet = (newDiet, successCallBack, errorCallBack, res) => {
    dietModal.insertMany([newDiet])
        .then(
            (dbRes) => {
                successCallBack(dbRes);
            },
            (dbErr) => {
                errorCallBack(dbErr);
            }
        )
        .catch((error) => {
            // exceptionHandler 
            console.log(error);
        })
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