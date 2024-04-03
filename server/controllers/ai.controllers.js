import { ApiResponse } from "../utils/ApiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import OpenAI from "openai";


const getDietFromAi=asyncHandler(async(req,res)=>{
        console.log("reached in ai diet")
        const openai = new OpenAI({
            apiKey : process.env.OPENAI_API_KEY
        });

        console.log("reached") 
        const{
            name, 
            country, 
            age, 
            gender, 
            weight, 
            height, 
            totalCalories, 
            foodSource, 
            fitnessGoal, 
            otherPreferences,
            protein,
            carbs,
            fats
        }= req.body

        const prompt = `Generate a diet plan for ${name} with the following details:
            - Age: ${age}
            - Protein: ${protein}
            - Carbs: ${carbs}
            - Fats: ${fats}
            - Total Daily Caloric Intake: ${totalCalories}
            - Food Source Type:  ${foodSource}
            - Gender: ${gender}
            - Weight: ${weight}
            - Height: ${height}
            - Fitness Goal: ${fitnessGoal}
            - Country: ${country}
            - Dietary Preferences: ${otherPreferences}
            `;
            
            const response=await openai.chat.completions.create({
                messages: [{ role:'user', content: prompt }],
                model: "gpt-3.5-turbo",
                // max_tokens: 100,
              });
    
            // console.log(response)
            
            if(
            !Array.isArray(response.choices) || 
            response.choices.length==0
            ){
                // throw new apiError(500, "something went wrong while fetching diet plan");
                return res.status(500).json(new ApiResponse(500, {}, "something went wrong while fetching diet plan"));
            }

            const dietPlan = response.choices[0].message;

        res
        .status(201)
        .json(new ApiResponse(200,{dietPlan},"Diet plan fetched successfully"));
})

const getWorkoutFromAi=asyncHandler(async(req,res)=>{
    
    console.log("Workout ai !!!")
    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY
    });

    const{
        name, 
        workoutLevel, 
        age, 
        gender, 
        weight, 
        height, 
        daysAvailable, 
        weakMuscle, 
        workoutType,
        fitnessGoal, 
        otherPreferences,
        sleepDuration,
        workoutDuration,
        splitType,
    }=req.body

    const prompt = `Generate a gym workout plan for ${name} with the following details:
        - Age: ${age}
        - Days Available in a week: ${daysAvailable}
        - Weak Muscle: ${weakMuscle}
        - Workout Type: ${workoutType}
        - Time Duration of Workout: ${workoutDuration}
        - Gender: ${gender}
        - Weight: ${weight}
        - Height: ${height}
        - Fitness Goal: ${fitnessGoal}
        - Workout Level: ${workoutLevel}
        - Workout Preferences: ${otherPreferences}
        - Daily Sleep Duration : ${sleepDuration}
        - Type of workout split: ${splitType}
        `;
        
        const response=await openai.chat.completions.create({
            messages: [{ role:'user', content: prompt }],
            model: "gpt-3.5-turbo",
            // max_tokens: 100,
          });

        // console.log(response)
        
        if(
        !Array.isArray(response.choices) || 
        response.choices.length==0
        ){
            // throw new apiError(500, "something went wrong while fetching workout plan")
            return res.status(500).json(new ApiResponse(500, {}, "something went wrong while fetching workout plan"));
        }

        const workoutPlan = response.choices[0].message;

    res
    .status(201)
    .json(new ApiResponse(200,{workoutPlan},"Workout plan fetched successfully"));
})

export {getDietFromAi, getWorkoutFromAi}