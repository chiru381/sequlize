const express = require("express");
const router = express.Router();

const userRoute = require("../controllers/user.api");

router.post("/user", userRoute.userCreation);
router.get("/get-users", userRoute.getallUsers);
router.put("/update-user",  userRoute.userUpdate);

module.exports = router;
