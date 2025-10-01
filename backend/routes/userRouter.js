const express = require("express")
const {
    getAllUsers,
    signupUser,
    loginUser,
} = require("../controllers/userControllers")

const router = express.Router();

// /api/users
router.get('/',getAllUsers)
router.post('/signup', signupUser)
router.post('/login', loginUser)

module.exports = router