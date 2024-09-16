import { Overlay, User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const pingJson = asyncHandler( async (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body)
})

const helloTest = asyncHandler( async (req, res) => {
    res.status(200).send("Hello World");
})

const registerUser = asyncHandler( async (req, res) => {
    
    const {name, email, password} = req.body;
    
    console.log("email: ",email);

    if (
    ([name, email, password].some((field) => field?.trim() === ""))
    ) {
        throw new ApiError(400, "All fields are required")
    }
    /*
    else{
        res.status(200).json({
            "Name": name,
            "Email": email,
            "Role": role,
            "avatar": `https://robohash.org/${email}\.png?size=50x50&set=set1`,
            "Overlay": Overlay
        })
    }
    */
    
    const existingUser = await User.findOne({ email: email })

    if(existingUser){
        throw new ApiError(409, "User with email already exists")
    }

    const createdUser = await User.create({
        name,
        email,
        password,
        avatar:`https://robohash.org/${email}\.png?size=50x50&set=set1`,
        overlay: await Overlay.create({
            rect:[{
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                fillColor: "#ffffff"
            }]
        })
        
    })

    if(!createdUser){
        throw new ApiError(400, "User not created")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
    
})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    console.log(email);

    console.log(password,"/n");

    if (!email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({email:email})

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        console.log("Invalid user credentials");
        const err = new ApiError(401, "Invalid user credentials")
        res.status(401).json(err)
    throw err
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})



const getUserOverlay = asyncHandler(async(req, res) => {
    console.log("getOverlay");
    if(!req.body._id){
        throw new ApiError(400, "user id is required")
    }
    const userOverlay = await Overlay.findById(req.body._id)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        userOverlay,
        "User Overlay fetched successfully"
    ))
})

const updateOverlay = asyncHandler( async (req, res) => {

    const userOverlay = req.body;
    
    console.log(userOverlay.overlay)

    const updatedUser = await Overlay.replaceOne(

        {
            _id: userOverlay._id,
        },
        userOverlay.overlay
    )
    console.log(updatedUser)

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        updatedUser,
        "User Overlay updated successfully"
    ))
    

})

const deleteUserOverlay = asyncHandler(async(req, res) => {
    if(!req.body._id){
        throw new ApiError(400, "user id is required")
    }
    const userOverlay = await Overlay.findByIdAndDelete(req.body._id)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        userOverlay,
        "User Overlay deleted successfully"
    ))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})


export { deleteUserOverlay, getCurrentUser, getUserOverlay, helloTest, loginUser, logoutUser, refreshAccessToken, registerUser, updateOverlay };

