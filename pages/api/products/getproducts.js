import Product from "@/models/Product";
import db from "@/utils/mongo";

export default async function handler(req, res) {
    let perPage = 50,
        page = req.query.page ? Math.max(0, req.query.page) : 0

    await db.connect();

    const data = await Product.find().limit(perPage).skip(perPage * page);

    res.send(data);
}