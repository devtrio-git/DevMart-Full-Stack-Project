import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    token: {type: String, default:""}
});


export const userModel = mongoose.model("user", userSchema);