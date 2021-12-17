const jwt=require('jsonwebtoken');
const User =require('../models/User');
const key="asjkdhfjlkshflsahdlhsadfajlaaafjhsdjkf";

async function auth(req,res,next)
{
    try {
        const token=req.header('jwt');
        const verifyUser=jwt.verify(token,key);
        const user=await User.findOne({_id:verifyUser._id});
        req.user=user;
        req.token=token;

    } catch (error) {
        console.log(error);
    }
    next();
}
module.exports=auth;