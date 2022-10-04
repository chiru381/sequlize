const express = require("express");
const router = express.Router();

const userRoute = require("../controllers/user.api");

router.post("/user", userRoute.userCreation);
router.get("/get-users", userRoute.getallUsers);
router.put("/update-user",  userRoute.userUpdate);
router.delete("/delete-user/:user_id", userRoute.deleteuser);
router.post("/login", userRoute.userlogin);
router.post("/change-password",  userRoute.changeuser);
router.post("/forgot-password",  userRoute.forgotuser);
router.post("/reset-password", userRoute.resetuser);
router.post("/check-userid",  userRoute.userValidater);
router.post("/jwtlogin",userRoute.jwtuserlogin);
router.post("/validateotp", userRoute.otpuser);

module.exports = router;
