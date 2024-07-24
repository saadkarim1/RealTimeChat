import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const singup = async (req, res) => {
	try {
		console.log(req.body);
		const { fullName, userName, password, confirmPassword, gender } = req.body;
		if (password !== confirmPassword) {
			res.status(400).json({ message: "passwords do not match" });
		}

		const user = await User.findOne({userName});

		if (user) {
			return res.status(400).json({ message: "user already exists" });
		}

        //HASHING PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;

		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

		const newUser = new User({
			fullName: fullName,
			userName,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

        if (newUser) {

            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            
            return res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
            });
        }else {
            res.status(400).json({message: 'Invalid user data.'})
        }
	} catch (error) {
		console.log("Error in sing up controller ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const login = async (req, res) => {
	try {
		console.log(req.body)
		const { userName, password } = req.body;
		const user = await User.findOne({ userName: userName });
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user?.password || ""
		); 
		
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({error: 'Invalid userName or password.'});
		}
		
		generateTokenAndSetCookie(user._id, res)
		
		return res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
			profilePic: user.profilePic,
		});

	} catch (error) {
		console.log("Error in sing up controller ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};





export const logout = (req, res) => {
	try {
		res.cookie("jwt",'',{maxAge:0})
		res.status(200).json({message: 'loged out successfully'})
	} catch (error) {
		console.log('Error in logout controller', error.message);
		res.status(500).json({eroor: 'Internal server error'})
		
	}
};