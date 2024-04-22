import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    isBlock:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

//bcrypt middleware
userSchema.pre("save", async function(next){
    const user:any = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

//bcrypt middleware
userSchema.methods.comparePassword = async function(string_password:string) {
    const isMatch:boolean = await bcrypt.compare(string_password,this.password)
    return isMatch;
}
//bcrypt middleware
userSchema.methods.updatePassword = async function(string_password:string) {
    const pass:string = await bcrypt.hash(string_password, 10)
    return pass;
}

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)