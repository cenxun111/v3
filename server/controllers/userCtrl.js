const Users = require('../models/userModel')

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({username: {$regex: req.query.username}})
            .limit(10).select("fullname username avatar")
            
            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSingleUser:async(req,res) => {
        try{
            const user = await Users.find({username:req.params.username}).select('-password').populate("likes","-password").sort({createdAt:-1,})
            // .populate("followers following", "-password")
            if(!user) return res.status(400).json({msg:"User does not exist."})
            res.status(200).json({user});
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updataUser:async(req,res) => {
        try{
            const {website,avatar,username,email,about} = req.body ;
            await Users.findOneAndUpdate({_id:req.user._id},{
                website,avatar,username,email,about
            })
            res.json({msg:"success!"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    getAlluser:async(req,res) => {
        try{
            const users = await  Users.find().sort({"createdAt":-1});
            res.status(200).json(users);
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    follow:async(req,res) => {
        try {
            const user = await Users.find({_id: req.params.id, followers: req.user._id})
            if(user.length > 0) return res.status(500).json({msg: "You followed this user."})

            const newUser = await Users.findOneAndUpdate({_id: req.params.id}, { 
                $push: {followers: req.user._id}
            }, {new: true}).populate("followers following", "-password")

            await Users.findOneAndUpdate({_id: req.user._id}, {
                $push: {following: req.params.id}
            }, {new: true})

            res.json({newUser})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        // Users.findByIdAndUpdate({_id:req.params.id},{
        //     $push:{followers:req.user._id}
        // },{new:true},
        // (err,result) =>{
        //     if(err) {
        //         return res.status(500).json({msg:err.message})
        //     }
        //     Users.findByIdAndUpdate(req.user._id,{
        //         $push:{following:{_id:req.params.id}}
        //     },{new:true}).then(result => {
        //         res.json(result)
        //     }).catch(err=>{
        //         return res.status(500).json ({msg:err.message})
        //     })
        
        // }
        // )
    },
    unfollow:async(req,res) => {
        try {

            const newUser = await Users.findOneAndUpdate({_id: req.params.id}, { 
                $pull: {followers: req.user._id}
            }, {new: true})

            await Users.findOneAndUpdate({_id: req.user._id}, {
                $pull: {following: req.params.id}
            }, {new: true})

            res.json({newUser})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        // .populate("followers following", "-password")
        // Users.findByIdAndUpdate(req.params.id,{
        //     $pull:{followers:req.user._id}
        // },{
        //     new:true
        // },(err,result) =>{
        //     if(err) {
        //         return res.status(500).json({msg:err.message})
        //     }
        //     Users.findByIdAndUpdate(req.user._id,{
        //         $pull:{following:req.params.id}
        //     },{new:true}).then(result => {
        //         res.json(result)
        //     }).catch(err=>{
        //         return res.status(500).json ({msg:err.message})
        //     })

        // }
        // )
    },
}
module.exports = userCtrl