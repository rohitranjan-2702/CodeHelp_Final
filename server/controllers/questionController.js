const expressAsyncHandler = require("express-async-handler");
const ratingModel = require("../models/ratingSchema");

const registerQuestion=expressAsyncHandler(async(req,res)=>{
    const {rating}=req.body;
    if(!rating){
        res.status(400);
        throw new Error("Enter the question to ask");
    }

    const question=await ratingModel.create({
        rating
    });
    res.json({
        rating:question.rating
    })
})

module.exports=registerQuestion;