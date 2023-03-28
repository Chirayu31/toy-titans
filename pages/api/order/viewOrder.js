import Orders from "@/models/Orders";
import User from "@/models/User";
import db from "@/utils/mongo";

export default async function handler(req, res) {
    const { email } = req.body
    db.connect()
    const user = await User.findOne({ email: email })

    try {
        const order = await Orders.find({
            user
        }).populate('products')
        res.status(200).send(order)

    } catch (error) {
        console.log(error.message)
    }
}