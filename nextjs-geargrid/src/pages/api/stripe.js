// src/pages/api/stripe.js (or src/pages/api/checkout_sessions.js)
import Stripe from "stripe";

// ✅ Initialize Stripe with your secret key (server-side only)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Received cart items:", req.body.cartItems);

    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1T9lrCCLyUBqCnpNzQM5ViV1" },
          { shipping_rate: "shr_1T9lsnCLyUBqCnpNbXvnzMor" },
        ],
        line_items: req.body.cartItems.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/oa7lyqwl/production/",
            )
            .replace("-webp", ".webp");
          console.log("Transformed image URL:", newImage);
          return {
            price_data: {
            currency: "eur",
            product_data: {
            name: item.name,
            images: [newImage],
            },
            unit_amount: item.price * 100,
            },
            adjustable_quantity: {
            enabled: true,
            minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      return res.status(200).json(session);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
