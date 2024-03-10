import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username is not unique"],
        lowercase:true,
        trim:true,
    },
    email : {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: [true,"Password is required"], 
   },
    dob : {
        type: Date,
        required: true,
    },
    workouts : [{
        type: mongoose.Schema.ObjectId,
        ref : "Workout"
    }],
    diets : [{
        type: mongoose.Schema.ObjectId,
        ref : "Diet"
    }],
    currentWorkout:{
        type: mongoose.Schema.ObjectId,
        ref : "Workout"
    },
    currentDiet:{
        type: mongoose.Schema.ObjectId,
        ref : "Diet"
    },
    weight:{
        type: String,
        required: true,
    },
    height:{
        type: String,
        required: true,
    },
    refreshToken:{
        type: String
    }

},{
    timestamps:true
})


//methods for userModal
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            name:this.name,
            username:this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const userModal = new mongoose.model("User", userSchema);

userModal.findUserByID = (reqID, successCallBack, errorCallBack) =>{
    userModal.findById(reqID)
    .then(
      (dbRes) => {
        successCallBack(dbRes);
      },
      (dbErr) => {
        errorCallBack(dbErr);
      }
    )
    .catch((error) => {
      console.log(error)
    });
}

userModal.updateUser = (reqID, update, successCallBack, errorCallBack, res ) => {
    userModal.findByIdAndUpdate(reqID, update)
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

userModal.deleteUser = (reqID, successCallBack, errorCallBack, res) => {
    userModal.findByIdAndDelete(reqID)
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

userModal.getUserWorkouts = (reqID, successCallBack, errorCallBack, res) => {
    userModal.findById(reqID)
      .populate("workouts")
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

userModal.getUserDiets = (reqID, successCallBack, errorCallBack, res) => {
    userModal.findById(reqID)
      .populate("diets")
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
// userModal.addWorkout = (re)
export { userModal };