var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");
const middlewareObj = require("../middleware");


//ADD COMMENT 
router.get("/campground/:id/comments/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comment/new",{campground:campground})
        }
    })
})

//SHOW COMMENT
router.post("/campground/:id/comments",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                comment.author.Id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campground/"+req.params.id)
            })
        }
    })
})

//EDIT COMMENT
router.get("/campground/:id/comments/:comment_Id/edit",middlewareObj.isReviewer,function(req,res){
    Comment.findById(req.params.comment_Id,function(err,foundComment){
        if(err){
            console.log(err);
        }else{
             res.render("comment/edit",{comment:foundComment,campgroundId:req.params.id});

        }
    })
})

//UPDATE COMMENT
router.put("/campground/:id/comments/:comment_Id",middlewareObj.isReviewer,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_Id,req.body.comment,function(err,updatedComment){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campground/"+req.params.id);
            
        }
    })
})

//DELETE COMMENT
router.delete("/campground/:id/comments/:comment_Id",middlewareObj.isReviewer,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_Id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campground/"+req.params.id);
        }
    })
})

module.exports= router;

