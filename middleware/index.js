var middlewareObj ={};
var Campground=require("../models/campground");
var Comment=require("../models/comment");

middlewareObj.isOwner=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect("back");
            }else{
                if(foundCampground.createdBy.userId.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        })
    }else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
        req.flash("error","You need to login to do that");
        res.redirect("/login");
    
}

middlewareObj.isReviewer=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_Id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.Id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        })
    }else{
        res.redirect("back");
    }
}

module.exports=middlewareObj;