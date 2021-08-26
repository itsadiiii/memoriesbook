const express              =require("express"),
methodOverride             =require("method-override"),
mongoose                   =require("mongoose"),
app                        =express(),
bodyParser                 =require("body-parser"),
Campground                 =require("./models/campground"),
Comment                    =require("./models/comment"),
User                       =require("./models/user"),
seedDB                     =require("./seeds"),
flash                      =require("connect-flash"),
passport                   =require("passport"),
localStrategy              =require("passport-local");

var campgroundRoutes       =require("./routes/campgrounds"),
    commentRoutes          =require("./routes/comments"),
    indexRoutes            =require("./routes/index");


//seedDB();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(flash());





// Campground.create({
//     name: "Sandy Dunes",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaypIc0eQucaJDJ-oeGYwgt0uPgBbjHLqeAg&usqp=CAU",
//     description: "nice camp"
// },function(err,camp){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(camp);
//     }
// });


//=============================================================
//PASSPORT CONFIGURATION
//=============================================================
app.use(require("express-session")({
    secret: "Aditya is best",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");

    next();
})

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);





















app.listen(process.env.PORT || 3000,function(){
    console.log("server at port 3000");
})

