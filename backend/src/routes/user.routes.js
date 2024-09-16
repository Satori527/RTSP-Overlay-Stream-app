import { Router } from "express";
import {
    deleteUserOverlay,
    getCurrentUser,
    getUserOverlay,
    helloTest,
    loginUser,
    logoutUser,

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
router.route("/delete-overlay").post(deleteUserOverlay)



export default router