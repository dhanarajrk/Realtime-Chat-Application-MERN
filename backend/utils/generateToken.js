import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'});  //jwt.sign method needs a payload (userId) and Secret key to create token

    res.cookie("jwt", token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !=="development"});  //res.cookie("anyname", token, {maxAge: cookie duration in ms, httpOnly:true to prevent XSS attack cross-site-scripting attack, sameSite:"strict" to prevent CSRF attack})
}

export default generateTokenAndSetCookie;