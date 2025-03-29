const express = require("express")

const {create,getAllUsers,getUserById, update,deleteUser} = require("../controller/userController.js")

const route = express.Router()
route.post("/user",create)
route.get("/users",getAllUsers)
route.get("/user/:id",getUserById)
route.put("/update/user/:id",update)
route.delete("/delete/user/:id",deleteUser)
module.exports = route;