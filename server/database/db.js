const mongoose=require('mongoose');

const URL='mongodb+srv://codehelp:codehelp1234@codehelp.rctj7pl.mongodb.net/?retryWrites=true&w=majority'

const connect=()=>{
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((db)=>{
        console.log('mongodb is connected succesfully to the server')
    },(err)=>{
        console.log(err);
    })
} 

module.exports = connect