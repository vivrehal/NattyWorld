import { ApiResponse } from "../utils/ApiResponse.js";
import { apiError } from "../utils/apiError.js";
import createAssistant from "../utils/assistantCreator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import openai from "openai";


const getDietFromAi=asyncHandler(async(req,res)=>{
        // Create a new conversation with the Assistant
        const assistant=await createAssistant()
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
            macrosAmount,
        }=req.body

        const prompt = `Generate a diet plan for ${name} with the following details:
        - Age: ${age}
        - Protein: ${macrosAmount.protein}
            - Carbs: ${macrosAmount.carbs}
            - Fats: ${macrosAmount.fats}
            - Total Daily Caloric Intake: ${totalCalories}
            - Food Source Type:  ${foodSource}
            - Gender: ${gender}
            - Weight: ${weight}
            - Height: ${height}
            - Fitness Goal: ${fitnessGoal}
            - Country: ${country}
            - Dietary Preferences: ${otherPreferences}`;
            
            const response = await openai.Assistant.createConversation({
                assistant_id: assistant.id,
                messages: [
                    { role: 'user', content: prompt }
                ],
                api_key: process.env.OPEN_AI_SECRET
            });
    
            // Extract and return the diet plan from the assistant's response
            const dietPlan = response.messages[1].content;

        if(
            !Array.isArray(response.messages) || 
            response.messages.length==0 || 
            !response.messages.content?.trim()
            ){
                throw new apiError(500, "something went wrong while fetching diet plan")
            }

        res
        .status(201)
        .json(new ApiResponse(200,dietPlan,"Diet plan fetched successfully"));
})

export {getDietFromAi}