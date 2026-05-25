const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign( 
        { id },
        process.env.JWT_SECRET, 
        {
            expiresIn: '7d',
        }
    );
}

const registerUser = async (req, res) => {
    
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
        }

        //check existing user
        const userExists = await User.findOne({ email});
        if(userExists){
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};

const userLogin = async (req, res) => {
    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ 
                success: false,
                message: 'Email and password are required' 
            });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ 
                success: false,
                message: 'User Not Found' 
            });
        }

        //check if password is correct
        const isMatch = await User.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({ 
                success: false,
                message: 'Invalid Credentials' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};

module.exports = {
    registerUser,
    userLogin,
};