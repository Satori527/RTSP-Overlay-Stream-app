import { Router } from "express";
import { createEvent, fetchEvents } from "../controllers/event.controller.js";
import {
    helloTest
} from "../controllers/user.controller.js";
helloTest
const router = Router()

router.route("/").get(fetchEvents)
// router.route("/").get(fetchEventsByID)
router.route("/create").post(createEvent)

export default router