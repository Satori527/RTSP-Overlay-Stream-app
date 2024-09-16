import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const { json } = bodyParser


const overlaySchema = new Schema({
    rect: [{
        id: {
            type: String,
            
        },
        x: {
            type: Number,
        },
        y: {
            type: Number,
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        fillColor: {
            type: String,
        },
    }],

    circle: [{
        id: {
            type: String,
            
        },
        x: {
            type: Number,
        },
        y: {
            type: Number,
        },
        radius: {
            type: Number,
        },
        fillColor: {
            type: String,
        },
    }],

    arrow: [{
        id: {
            type: String,
            
        },
        points: {
            type: Array,
        },
        fillColor: {
            type: String,
        },
    }],

    scribble: [{
        id: {
            type: String,
            
        },
        points: {
            type: Array,
        },
        fillColor: {
            type: String,
        },
    }]

    
});

export const Overlay = mongoose.model("Overlay", overlaySchema)

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            //required: true
        },
        overlay: {
            type: Schema.Types.ObjectId,
            ref: "Overlay"
            
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)


/*
"user": "user@gmail.com",

    "start": {

        "$date": "2024-08-30T03:30:00.000Z"

    },

    "end": {

        "$date": "2024-08-30T07:00:00.000Z"

    },

    "duration": 30,

    "scheduledSlots": [

    ]

}
*/

/*
{

    "user": "user@gmail.com",

    "start": {

        "$date": "2024-08-30T03:30:00.000Z"

    },

    "end": {

        "$date": "2024-08-30T04:00:00.000Z"

    },

    "duration": 30,

    "scheduledSlots": [

        {

            "start": {

                "$date": "2024-08-30T03:30:00.000Z"

            },

            "end": {

                "$date": "2024-08-30T04:00:00.000Z"

            },

            "attendees": [

{

            "name": "siri",

            "email": "siri@myparticipants.com",

                        }

]

        }

    ]

}

*/