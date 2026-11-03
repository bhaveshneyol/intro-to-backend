import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // create new user
        const newUser = await User.create({
            username,
            password,
            email: email.toLowerCase(),
        });

        res.status(201).json({
             message: "User registered successfully.", 
             user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
             }
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user.", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
         

        // checking if the user already exists

        const{ email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

          if(!user) return res.status(400).json({
            message: "User not found with this email."
          });


          //comparing the password with the hashed password in the database

          const isMatch = await user.comparePassword(password);
          if(!isMatch) return res.status(400).json({
            message: "Invalid password."
          });
  

          res.status(200).json({
            message: "User logged in successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
          });
    } catch (error) {
        
        res.status(500).json({ message: "Error logging in user." });
    }
}
const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
}

export { registerUser, loginUser, logoutUser };