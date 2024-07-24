import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
			expiresIn: "15d",
		});

    res.cookie("jwt", token, {
        maxAge: 15 * 60 * 60 * 1000, //MS
        httpOnly: true,
        semeSite: 'strict', //CSRF
        secure: process.env.NODE_NV !== 'development'

    })
}

export default generateTokenAndSetCookie;