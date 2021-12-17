const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const key="asjkdhfjlkshflsahdlhsadfajlaaafjhsdjkf";

const MySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:Number,
    password:String,
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

MySchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,4);
    }
    next();
})

MySchema.methods.generateAuthToken=async function()
{
    try {
        const token=jwt.sign({_id:this._id.toString()},key);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const user=mongoose.model('User',MySchema);

module.exports=user;