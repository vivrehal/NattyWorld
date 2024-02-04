import express from "express";
import connectTodb from "./db.js";
import 'dotenv/config';
const app=express();
app.use(express.json())

connectTodb(process.env.DB_URI);


try {
    app.listen(process.env.PORT,()=>{
        console.log(`App listening on port ${process.env.PORT}`);
    })
    
} catch (error) {
    console.log(error);
    throw error;
}
