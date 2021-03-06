const mongoose                   =require("mongoose");

var campSchema=new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    createdBy:{
           userId:{
               type:mongoose.Schema.Types.ObjectId,
               ref:"User"
           },
           username:String
    },
    price:String,
    
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    
});

module.exports = mongoose.model("Campground",campSchema);

