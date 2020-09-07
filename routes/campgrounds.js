var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
const e = require("express");
var middleware=require("../middleware")


//INDEX ROUTE
router.get("/campground",function(req,res){
    Campground.find({},function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/index",{camps: camp})
        }
    })
});


//NEW ROUTE
router.get("/campground/new",middleware.isLoggedIn,function(req,res){
    res.render("campground/new");
});


//SHOW ROUTE
router.get("/campground/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundCamp);
            res.render("campground/show",{camp:foundCamp});
        }
    })
})



//CREATE ROUTE
router.post("/campground",middleware.isLoggedIn,function(req,res){
    Campground.create(req.body.campground,function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            camp.createdBy.userId=req.user._id;
            camp.createdBy.username=req.user.username;
            camp.save();
             res.redirect("/campground");
 
        }
    })
 })

 //EDIT ROUTE
 router.get("/campground/:id/edit",middleware.isOwner,function(req,res){
     Campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }
        else{
     res.render("campground/edit",{camp:camp})

        }
     })
 })





 //UPDATE ROUTE
 router.put("/campground/:id",middleware.isOwner,function(req,res){
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,camp){
            if(err){
                console.log(err);
            }else{
                res.redirect("/campground/"+req.params.id);
            }
        })
 })

 //DELETE ROUTE
 router.delete("/campground/:id",middleware.isOwner,function(req,res){
     Campground.findByIdAndRemove(req.params.id,function(err){
         if(err){
             console.log(err);
         }else{
             res.redirect("/campground")
         }
     })
 })

 





 module.exports=router;

