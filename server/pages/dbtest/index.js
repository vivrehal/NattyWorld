import { userModal } from "../../models/user.modal.js";

function dbtest(req, res){
    console.log("hi");
    res.send("hi");
    // res.send(userModal.find());
}

export {dbtest};