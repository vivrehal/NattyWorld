import { apiError } from "./apiError.js";
import { asyncHandler } from "./asyncHandler.js";

const createAssistant=async ()=>{
  try {
          const assistant = await openai.Assistant.create({
              display_name: 'Diet and Workout Assistant',
              description: 'An AI assistant trained to provide diet and workout plans.',
              roles: ['dietician', 'personal-workout-trainer'],
              api_key: process.env.OPENAI_API_KEY
          });
          if(!assistant){
              throw new apiError(500, "error while creating ai assisstant")
          }
          console.log('Assistant created successfully:');
          // console.log(assistant);
  
          return assistant;
  } catch (error) {
     return error
  }
}

// const assistant=createAssistant()
export default createAssistant