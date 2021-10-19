const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require("../middleware/auth");

router.post('/createnewsPost',auth,postCtrl.createNewsPost)

router.get('/post/:id',auth,postCtrl.singlePost)

router.get('/user_posts',auth,postCtrl.getUserPosts)

router.get('/allpost',auth, postCtrl.allPost)

router.delete('/post/:id',auth,postCtrl.deletePost)

router.patch('/post/:id',auth,postCtrl.updatePost)

router.patch('/postc/:id',auth,postCtrl.updateContent)

router.get('/userpost/:username',auth,postCtrl.allUsersPosts)

router.patch('/postlike/:id',auth,postCtrl.likePost)


router.patch('/postunlike/:id',auth,postCtrl.unlikePost)


module.exports = router