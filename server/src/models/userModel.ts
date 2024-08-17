import mongoose, { Document, Schema } from "mongoose";
import JWT from 'jsonwebtoken';
import bcryt from 'bcryptjs';

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    comparePassword(candidatePassword: string): Promise<boolean>
    generateToken(): Promise<any>
};


const userSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},
    { timestamps: true }
);


// Hash user password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt_rounds = await bcryt.genSalt(10);
    const hashed_password = await bcryt.hash(this.password, salt_rounds);
    this.password = hashed_password;

});

// compare password 
userSchema.methods.comparePassword = async function (password: string) {
    return await bcryt.compare(password, this.password)
};


// Generate Token
userSchema.methods.generateToken = async function () {
    try {
        return JWT.sign({
            id: this._id,
            email: this.email,
        },
            process.env.JWT_SECRET!,
            { expiresIn: '2d' }
        )
    } catch (error) {
        console.log(`Generate Token Failed : ${error}`);
    }
}


export default mongoose.model<IUser>('User', userSchema);