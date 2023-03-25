import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    address: {
        type: String
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    paymentType: { type: Number },
    isPaid: { type: Boolean },
    paymentId: { type: String }
}, { timestamps: true })

const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema)
export default Orders