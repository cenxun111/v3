const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")

router.get('/search',auth,userCtrl.searchUser)
router.get('/user/:username',auth,userCtrl.getSingleUser)
router.patch('/edituser',auth,userCtrl.updataUser)
router.get('/alluser',auth,userCtrl.getAlluser)
router.patch('/follow/:id',auth,userCtrl.follow)
router.patch('/unfollow/:id',auth,userCtrl.unfollow)

module.exports = router