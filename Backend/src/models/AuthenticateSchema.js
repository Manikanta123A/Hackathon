import mongoose,{ Schema } from "mongoose";
const userSchema = new Schema({
    Mail:{type:String, required: true},
    username:{type:String , required:true, unique:true},
    password:{type:String, required:true},
    token:String,

})
const user = mongoose.model('userschema',userSchema);
export {user};