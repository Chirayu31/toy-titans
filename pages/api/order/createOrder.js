import Orders from "@/models/Orders";
import User from "@/models/User";
import db from "@/utils/mongo";

export default async function handler(req, res) {
    const { ids, email } = req.body
    db.connect()
    const user = await User.findOne({ email: email })

    try {
        await Orders.create({
            products: ids,
            user
        })
        res.status(200).send("Completed")

    } catch (error) {
        console.log(error.message)
    }
}