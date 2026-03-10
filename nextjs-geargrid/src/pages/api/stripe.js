import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            
        } catch (error) {
            console.error('Error creating payment intent:', error);
            res.status(500).json({ message: error.message }); 
        }
    }
}