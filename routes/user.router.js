const express = require("express");
const router = express.Router();

const userRoute = require("../controllers/user.api");

router.post("/user", userRoute.userCreation);

module.exports = router;
