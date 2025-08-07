import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk USer with database

const clerkWebhooks = async (req, res) => {
    console.log('Received webhook request');
    console.log('Body' , req.body)
    console.log('headers' , req.headers)
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature'],
        });
        console.log('Webhook verified');

        const { data, type } = req.body;
        console.log('Event type:', type);
        console.log('Event data:', data);

        switch (type) {
            case 'user.created':
                console.log('Creating user...')
                try {
                    const userData = {
                        _id: data.id,
                        name: data.first_name,
                        email: data.email_addresses[0].email_address,
                        imageUrl: data.image_url,
                    };
                    await User.create(userData);
                    return res.status(200).json({});
                } catch (error) {
                    console.error('Error creating user:', error);
                    return res.status(500).json({ error: 'Failed to create user' });
                }

            case 'user.updated': {
                console.log('update user:', type)
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                console.log('deleted user:', type)
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                console.log('Unhandled event type');
        }
        res.status(200).json({});
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(400).json({ error: error.message });
    }
};

export default clerkWebhooks