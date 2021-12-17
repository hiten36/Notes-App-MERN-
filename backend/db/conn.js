const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/pr4').then(()=>{
    console.log('Database Connected! ');
}).catch((error)=>{
    console.log(error);
})

module.exports=mongoose;