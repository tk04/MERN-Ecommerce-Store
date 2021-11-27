import User from "../models/userModel.js"
import AsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = AsyncHandler(async (req,res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(user &&  (await user.matchPassword(password))){
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    res.status(401)
    throw new Error("Invalid email or password")
})


// @desc register a new user
// @route POST /api/users/
// @access Public

const registerUser = AsyncHandler(async (req,res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        return res.status(201).json({
            _id: user._id,
            name,
            email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    res.status(400)
    throw new Error("Invalid user data")
})

// @desc get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = AsyncHandler(async (req,res) => {
    if(req.user){
        return res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin
        })
    }
    res.status(404)
    throw new Error("User not Found")
})

export {
    authUser,
    getUserProfile,
    registerUser
}