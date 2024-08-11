import { userModel } from "../models/user.schema.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import Constants from "../constant.js";
import sendMail from "../utilities/email-send.js";
export default class Users {
    static async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required", status: "failed" })
            }
            // check if email already exists
            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ message: "Email already exists", status: "failed" })
            }
            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // create new user
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword
            })
            await newUser.save();
            // create JWT token
            const payload = {
                user: {
                    id: newUser._id
                }
            }
            const token = jwt.sign(
                payload,
                Constants.JWT_SECRET,
                { expiresIn: "1y" }
            )
            // save token in database
            newUser.token = token;
            await newUser.save();
            console.log(token, "<-- token")
            res.status(201).json({ message: "User created successfully", status: "success", data: newUser })
        } catch (error) {
            res.status(500).json({ message: "Interval Server Error", status: "failed" })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required", status: "failed" })
            }
            const user = await userModel.findOne({ email });
            console.log(user, "user")
            if (!user) {
                return res.status(404).json({ message: "User not found", status: "failed" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            console.log(isMatch, "<-- isMatch")
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid Password", status: "failed" })
            }

            // create JWT token
            const payload = {
                user: {
                    id: user._id
                }
            }
            const token = jwt.sign(
                payload,
                Constants.JWT_SECRET,
                { expiresIn: "1y" }
            )

            user.token = token;
            await user.save();

            res.json({ message: "User logged in successfully", status: "success", data: user })

        } catch (error) {
            res.status(500).json({ message: "Interval Server Error", status: "failed" })
        }
    }

    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "All fields are required", status: "failed" })
            }

            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found", status: "failed" })
            }

            const otp = Math.floor(Math.random() * 900000 + 100000);

            const mailResponse = await sendMail({
                email: [email],
                subject: "OTP Verification Code",
                htmlTemplate: `<h1>OTP: ${otp}</h1>`
            });

            if (!mailResponse) {
                res.status(500).json({ message: "Failed to send otp, please try later", status: "failed" })
            }
            user.otp = {
                value: otp.toString(),
                expireAt: new Date(Date.now() + 1000 * 60 * 10),
                verified: false
            }

            await user.save();
            res.status(200).json({ message: "OTP Send Successfully", status: "success" })

        } catch (error) {
            res.status(500).json({ message: "Interval Server Error", status: "failed" })
        }
    }
    static async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) {
                return res.status(400).json({ message: "All fields are required", status: "failed" })
            }

            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found", status: "failed" })
            }

            if (user.otp.value !== otp.toString()) {
                res.status(400).json({ message: "Invalid OTP", status: "failed" })
            }
            const currentTime = new Date();
            if (user.otp.expireAt < currentTime) {
                res.status(400).json({ message: "OTP is expired", status: "failed" })
            }
            user.otp.verified = true;
            await user.save();
            res.status(200).json({ message: "OTP Verified Successfully", status: "success" })

        } catch (error) {
            res.status(500).json({ message: "Interval Server Error", status: "failed" })
        }
    }

    static async resetPassword(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required", status: "failed" })
            }
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found", status: "failed" })
            }

            if (!user.otp.verified) {
                return res.status(404).json({ message: "OTP Authentication failed, you are not verified user", status: "failed" })
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
            user.otp.verified = false;
            // create JWT token
            const payload = {
                user: {
                    id: user._id
                }
            }
            const token = jwt.sign(
                payload,
                Constants.JWT_SECRET,
                { expiresIn: "1y" }
            )

            user.token = token;
            await user.save();

            res.status(200).json({ message: "Password Update Successfully", status: "success" })

        } catch (error) {
            res.status(500).json({ message: "Interval Server Error", status: "failed" })
        }
    }

}




// forgot password apis...
/*
email...
otp...
verify..
password update....
*/

/*
signup algorithm
1. get data from req.body
2. required validation
3. check if email already exists
4. hash password
5. create new user
6. generate JWT token
7. save token in database
8. return token with user data
*/

/* 
login algorithm
1. get data from req.body
2. required validation
3. check if email exists
4. check password bcrypt.compare
5. create JWT token
6. save token
7. return token with user data








/*
// bcrypt js
// 1. const salt = await bcrypt.genSalt(10);  salt could look like "$2a$10$E4v3.Z9Wc.mVrDk2g9K0H."

// The bcrypt.genSalt() method is used to generate a "salt" for hashing passwords. A salt is a random string that is added to the password before hashing to ensure that even if two users have the same password, their hashed passwords will be different.

// 2. const hashedPassword = await bcrypt.hash(password, salt);

//  The bcrypt.hash() method takes a plain text password and a salt as input, and it produces a hashed version of the password. The hashed password is what gets stored in the database, not the plain text password.

// 3. const isMatch = await bcrypt.compare("mysecretpassword", hashedPassword);
// isMatch would be true if "mysecretpassword" matches the hashed password stored in the database.



// JWT

1. jwt.sign(
    payload,                  // The data to be included in the token
    Constants.JWT_SECRET,     // The secret key used to sign the token
    { expiresIn: '12y' }      // Options, including the token's expiration time // 1d, 1h
);

//This is a secret key (a string) that is used to sign the token. It's a critical part of the token generation process because it ensures that the token can only be verified with the same secret key.
//The secret key should be kept safe and not shared publicly because it is used to ensure that the token hasn't been tampered with.
*/