const Posts = require("../models/postModel");
const Users = require("../models/userModel");
const postCtrl = {
  createNewsPost: async (req, res) => {
    const newPost = new Posts(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    allPost: async (req, res) => {
      try {
        const posts = await Posts.find().sort({"createdAt": -1});
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
    },

  singlePost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const userposts = await Posts.find({ username: req.user.username }).sort({
        createdAt: -1,
      });

      res.status(200).json(userposts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  allUsersPosts:async(req,res) => {
    try {
      const alluserspost =  await Posts.find({username:req.params.username}).sort({createdAt:-1,});
      res.status(200).json(alluserspost)
    }catch(err){
      return res.status(500).json(err);
    }
  },
  

  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({ _id: req.params.id });
      res.json(post);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { photo } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        { photo }
      );
      res.json({
        newPost:{
         ...post._doc,
      
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateContent: async (req, res) => {
    try {
      const { content } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        { content }
      );
      res.json({
        newPost:{
         ...post._doc,
          content
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // likePost:async(req,res) => {
  //   try{
  //     const postlike = await Posts.find({_id:req.params.id,likes:req.user._id})
  //     if(postlike) return res.status(400).json({msg:"you liked this post."})
  //     await Posts.findByIdAndUpdate({_id:req.params.id},{
  //       $push:{likes:req.user._id}
  //     },{new:true})
  //     res.json({msg:'Liked Post!'})
  //   } catch(err) {
  //     return res.status(500).json({msg:err.message})
  //   }
  // },

  likePost: async (req, res) => {
    try {
        const post = await Posts.find({_id: req.params.id, likes: req.user._id})
        if(post.length > 0) return res.status(400).json({msg: "You liked this post."})

        const like = await Users.findOneAndUpdate({_id:req.user._id}, {
          $push: {likes: req.params.id}
      }, {new: true}).populate("likes").sort({createdAt:-1,})
      
      await Posts.findOneAndUpdate({_id: req.params.id}, {
            $push: {likes: req.user._id}
        }, {new: true})
       

        if(!like) return res.status(400).json({msg: 'This post does not exist.'})

        res.json({like})
        console.log(like)

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

unlikePost: async (req, res) => {
  try {

      const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
          $pull: {likes: req.user._id}
      }, {new: true})

      if(!like) return res.status(400).json({msg: 'This post does not exist.'})

      res.json({msg: 'UnLiked Post!'})

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},


};

module.exports = postCtrl;
