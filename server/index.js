import { app } from "./app.js";
import connectTodb from "./db.js";
import 'dotenv/config';

import {router} from "./routes/dbtest/index.js";

connectTodb(process.env.DB_URI).then(()=>{
    try {
        app.listen(process.env.PORT || 9000,()=>{
            console.log(`App listening on port ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}).catch((err)=>{
    console.log("DB connection failed !! ", err)
})

// Testing the DB methods
// import "./pages/dbtest/index.js";
app.use("/dbtest", router);


