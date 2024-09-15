import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
        email: String,
        uri: String,
        event_type: String,
        title: String,
        description: String,
        length: Number,
        booking_times: {date:Date, time:String},
        attendees: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    { timestamps: true, }
);

export const Event = mongoose.model("Event", eventSchema)