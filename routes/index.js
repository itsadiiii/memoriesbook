var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var User=require("../models/user")
var passport=require("passport");

//HOME ROUTE
router.get("/",function(req,res){
    res.render("landing")
});


//===============================================================
//USER AUTH
//===============================================================
router.get("/register",function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message+". Try Again!")
            
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
             req.flash("success","Welcome to CampThrill "+req.user.username +"!!")
             res.redirect("/campground");
            })
        }
    })
})

//==================================================
//USER LOGIN
//==================================================
router.get("/login",function(req,res){
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
 successRedirect:"/campground",
    failureRedirect:"/login"
}),function(req,res){})


//LOGOUT
router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","You have successfully logged out")
    res.redirect("/campground");
})


function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login")
    }

}


module.exports= router;