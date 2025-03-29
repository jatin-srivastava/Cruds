const users = require("../model/userModel.js")
const create= async(req,res)=>{
    try{
        const newUser = new users(req.body)
        const {email}= newUser
        const userExist=await users.findOne({email})
        if (userExist){
            return res.status(400).json({message :"user already exits"})
        }
        const savedData = await newUser.save()
        // res.status(200).json(savedData)
        res.status(200).json({message:"user created successfully."})

    }catch(err){
        res.status(500).json({errorMessage:err.message})
    }
}

const getAllUsers = async (req,res)=>{
    try {
        const userData = await users.find()
        if(!userData || userData.length===0){
           return res.status(404).json({message:"User Data not found"})
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const getUserById = async (req,res)=>{
    try {
        const id = req.params.id
        const userExist = await users.findById(id)
        if(!userExist){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(userExist)
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const update = async(req,res)=>{
    try {
        const id = req.params.id
        const userExist = await users.findById(id)
        if(!userExist){
            return res.status(404).json({message:"User not found"})
        }
        const updateData = await users.findByIdAndUpdate(id,req.body,{
            new:true
        })
        // res.status(200).json(updateData)
        res.status(200).json({message:"user updated successfully."})
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id
        const userExist = await users.findById(id)
        if(!userExist){
            return res.status(404).json({message:"User not found"})
        }
        await users.findByIdAndDelete(id)
        res.status(200).json({message:"user deleted succesfully"})
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}


module.exports = {create,getAllUsers,getUserById,update,deleteUser};