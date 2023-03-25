const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
    const { items, email } = req.body;


    const transformedItems = items.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.title,
            },
            unit_amount: item.price * 100,
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["IN"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        metadata: {
            email,
        },
    });

    res.status(200).json({ id: session.id });
};