import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
res.send("Authverify");
})

router.get("/register", (req, res) => {
res.send("register");
})

export default router;