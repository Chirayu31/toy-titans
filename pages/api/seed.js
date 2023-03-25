import Product from "@/models/Product";
import db from "@/utils/mongo";
import data from "@/data";

export default async function handler(req, res) {

    await db.connect();
    await Product.deleteMany()

    await Product.insertMany(data)

    await db.disconnect()
    res.send({ message: 'seeded successfully' });
}