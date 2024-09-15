import { Router } from "express";
import {
    getCurrentUser,
    getUserAvailability,
    getUserById,
    getUsers,
    helloTest,
    loginUser,
    logoutUser,
    pingJson,
    refreshAccessToken,
    registerUser,
    updateAvailability
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
helloTest
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/availability").post(getUserAvailability)
router.route("/update-availability").post(updateAvailability)


router.route("/admin/users").get(getUsers)
router.route("/admin/user").post(getUserById)

router.route("/ping").post(pingJson)
//router.route("/users/:id/availability").get(getUserAvailability)

//router.route("/").get(helloTest)




//router.route("/").










/*
router.get("/",async (req, res) => {
    const page = parseInt(req.query.page)
})
*/
export default router