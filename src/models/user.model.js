import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
    },

    {
        timestamps: true
    }

)

// before saving any password, we will hash it

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

    //compare the password with the hashed password in the database

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}   



export const User = mongoose.model("User", userSchema);