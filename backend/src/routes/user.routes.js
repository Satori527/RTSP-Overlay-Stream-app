import { Router } from "express";
import {
    getCurrentUser,
    getUserById,
    getUserOverlay,
    getUsers,
    helloTest,
    loginUser,
    logoutUser,
    pingJson,
    refreshAccessToken,
    registerUser,
    updateOverlay
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
helloTest
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/overlay").post(getUserOverlay)
router.route("/update-overlay").post(updateOverlay)


router.route("/admin/users").get(getUsers)
router.route("/admin/user").post(getUserById)

router.route("/ping").post(pingJson)
//router.route("/users/:id/Overlay").get(getUserOverlay)

//router.route("/").get(helloTest)




//router.route("/").










/*
router.get("/",async (req, res) => {
    const page = parseInt(req.query.page)
})
*/
export default router