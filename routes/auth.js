const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGH UP
router.post("/register",async(req,res) =>{
    try {
        const { email, username, password } = req.body; 
        const hashpossword = bcrypt.hashSync(password);
        const user = new User({email, username, password: hashpossword});
        await user.save().then(() =>{
            res.status(200).json({message:"Sign Up Successful" });
        });
    } catch (error) {
        res.status(200).json({message :"Please! Filled The Required Data"});
    }
});

// SIGN IN
router.post("/signin",async(req,res) =>{
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
           return res.status(200).json({message :"User not found. Please Sign Up First " });
        }

        const ispasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!ispasswordCorrect){
            return res.status(200).json({message :"Password Is Not Correct " });
        }
        const {password, ...others } = user._doc;
        res.status(200).json({ user: others });

    } catch (error) {
        console.error(error);
        res.status(200).json({message :"Internal Server Error" });
    }
});

module.exports = router;