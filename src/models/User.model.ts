
import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    _id: string;
    content: string;
    createdAt: Date;
}

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const MessageSchema: Schema<Message> = new Schema({

    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },

}, { timestamps: true });

const UserSchema: Schema<User> = new Schema({

    username: {
        type: String,
        required: [true, "Username is Required"],
        trim: true,
        unique: [true, "Username already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: [true, "Email already exists"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is Required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is Required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema],

}, { timestamps: true });

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;