const mongoose=require('mongoose');

const MySchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
    },
    desc:{
        type:String
    }
});

const note=mongoose.model('Note',MySchema);

module.exports=note;