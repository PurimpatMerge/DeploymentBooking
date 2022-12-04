import express from "express";
import {updateUser, deleteUser, getUser, getAllUser} from "../ctr/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("You are logged in");
})
//Update
router.put("/:id", verifyUser, updateUser);

//Delete
router.delete("/:id", verifyUser,  deleteUser);

//Get
router.get("/:id",verifyUser, getUser);

//Get All
router.get("/",verifyAdmin, getAllUser);

export default router;