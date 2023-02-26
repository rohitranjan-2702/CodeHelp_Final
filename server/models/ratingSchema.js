const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ratingSchema=new Schema({
    rating:{
        type:Number,
        required:true,
    }
})
module.exports=mongoose.model("rating",ratingSchema);