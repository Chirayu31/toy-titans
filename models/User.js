import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    provider: String,
    providerData: Object,
})
const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User