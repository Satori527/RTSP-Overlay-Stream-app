import { Event } from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createEvent = asyncHandler(async (req, res) => {
    const { email, event_type, title, description, length, booking_times, attendees } = req.body;
    if (!email || !event_type || !title || !length || !booking_times || !attendees) {
        throw new ApiError(400, "All fields are required");
    }

    const event = await Event.create({
        email,
        event_type,
        uri: `https://localhost:5173/event/:${title}`,
        title,
        description,
        length,
        booking_times,
        attendees
    })
    res.status(200).json(new ApiResponse(200, event, "Event created successfully"))

})

const fetchEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"))
})

export { createEvent, fetchEvents };
