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

// @desc update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = AsyncHandler(async (req,res) => {
    if(req.user){
        const updates = Object.keys(req.body)
        const allowedUpdates = ["name", "email", "password", "isAdmin"]
        const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))
        if(!isValidOperation){
            return res.status(400).send({message: "invalid updates"})
        }
        updates.forEach(update => req.user[update] = req.body[update])
        const updatedUser =  await req.user.save()
        return res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    }
    res.status(404)
    throw new Error("User not Found")
})


// @desc get all users
// @route GET /api/users/
// @access Private/Admin

const getUsers = AsyncHandler(async (req,res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc delete aa users
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUser = AsyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    await user.remove()
    res.json({message: "User removed"})
    
})

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser
}