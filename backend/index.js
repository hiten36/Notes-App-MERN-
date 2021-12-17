const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const Note = require('./models/Note');
const bcrypt = require('bcrypt');
const auth=require('./auth/auth');
require('./db/conn');
const cors=require('cors');
const port = process.env.PORYT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('hello world!');
})

app.get('/user',async (req,res)=>{
    const users=await User.find();
    res.send(users);
})

app.get('/admin',auth,async (req,res)=>{
    try {
        let user=req.user;
        if(user)
        {
            res.send(user);
        }
    } catch (error) {
        return res.status(404).json({ success: false, message: error });
    }
})

app.post('/signin', [
    body('name', 'Username should be greater than 2').isLength({ min: 3 }),
    body('age', 'Age must be in number only').isNumeric(),
], async (req, res) => {
    try {
        let name = req.body.name;
        let age = req.body.age;
        let password = req.body.password;
        let flag = validationResult(req);
        if (!flag.isEmpty()) {
            return res.status(400).json({ success: false, message: flag.array() });
        }
        let userAlready = await User.findOne({ name: name });
        if (userAlready) {
            return res.status(404).json({ success: false, message: 'Username already taken! ' });
        }
        let newUser = new User({
            name: name,
            age: age,
            password: password
        })
        await newUser.save();
        User.createIndexes();
        res.json({success: true, message: 'Signin Successfull! You can login now.'});
    } catch (error) {
        return res.status(404).json({ success: false, message: error });
    }
})

app.post('/login',async (req,res)=>{
    try {
        let name=req.body.name;
        let password=req.body.password;
        let userAlready=await User.findOne({name:name});
        
        if(!userAlready)
        {
            return res.status(400).json({success:false,message:'User not available! '});
        }
        let passwordCompare=await bcrypt.compare(password.toString(),userAlready.password);
        if(!passwordCompare)
        {
            return res.status(400).json({success:false,message:'Invalid Credentials! '});
        }
        let token=await userAlready.generateAuthToken();
        res.cookie('jwt',token,{
            expires:new Date(Date.now()+100000000),
            httpOnly:true
        })
        res.json({success:true,message:'Login Successfully! ',jwt:token});
    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, message: error });
    }
})

app.get('/notes',auth,async (req,res)=>{
    try {
        let user=req.user;
        if(user)
        {
            let notes=await Note.find({user:user._id});
            res.send(notes);
        }
    } catch (error) {
        return res.status(404).json({ success: false, message: error });
    }
})

app.post('/notes',auth,async (req,res)=>{
    try {
        let user=req.user;
        if(user)
        {
            let title=req.body.title;
            let desc=req.body.desc;
            let userId=user._id;
            let newNote=new Note({
                user:userId,
                title:title,
                desc:desc
            });
            let saveNote=await newNote.save();
            Note.createIndexes();
            res.send(saveNote);
        }

    } catch (error) {
        return res.status(404).json({ success: false, message: error });
    }
})

app.put('/notes/:id',auth,async (req,res)=>{
    try {
        let user=req.user;
        if(user)
        {
            let title=req.body.title;
            let desc=req.body.desc;
            let userId=user._id;
            let noteId=req.params.id;
            let note=await Note.findById(noteId);
            if(note)
            {
                if(note.user.toString()===userId.toString())
                {
                    let note1={};
                    if(title)
                    {
                        note1.title=title;
                    }
                    if(desc)
                    {
                        note1.desc=desc;
                    }
                    let updateNote=await Note.findByIdAndUpdate(noteId,{$set:note1},{new:true});
                    await updateNote.save();
                    res.json({success:true, message:'Note updated! '});
                }
                else
                {
                    res.json({success:false, message:'Not Authorised! '});
                }
            }
            else
            {
                res.json({success:false, message:'Note not found1 '});
            }
        }
    } catch (error) {
        return res.status(404).json({ success: false, message: error });
    }
});

app.delete('/notes/:id',auth,async (req,res)=>{
    try {
        let user=req.user;
        if(user)
        {
            let noteId=req.params.id;
            let userId=user._id;
            let note=await Note.findById(noteId);
            if(note)
            {
                if(note.user.toString()===userId.toString())
                {
                    await Note.findByIdAndDelete(noteId);
                    res.json({success:true,message:'Note deleted! '});
                }
                else
                {
                    res.json({success:false, message:'Not Authorised! '});
                }
            }
            else
            {
                res.json({success:false, message:'Note not found1 '});
            }
        }
    } catch (error) {
        return res.status(404).json({ success: false, message: error });
    }
});

app.get('/logout',auth,async (req,res)=>{
    try {
        let user=req.user;
        if(user)
        {
            user.tokens=[];
            res.clearCookie('jwt');
            await req.user.save();
            res.json({success:true,message:'Logout Successful! '});
        }
    } catch (error) {
        return res.status(404).json({ success: false, message: error });
    }
})

app.listen(port, () => {
    console.log('Connection Successfull');
})