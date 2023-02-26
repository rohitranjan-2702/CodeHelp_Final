const express=require('express');
const registerQuestion=require('../controllers/questionController');

const router=express.Router();

router.post("/rating",registerQuestion);

module.exports=router;