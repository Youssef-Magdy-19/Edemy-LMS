import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk USer with database
export const clerkWebhooks = async (req, res) => {
    try {
        const headers = req.headers;
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const evt = wh.verify(payload, headers);

        if (evt.type === 'user.created' || evt.type === 'user.updated') {
            const { id, email_addresses, name, profile_image_url } = evt.data; // ضفت profile_image_url

            let user = await User.findOne({ clerkUserId: id });

            if (user) {
                user.email = email_addresses?.email_address || user.email;
                user.name = name || user.name;
                user.imageUrl = profile_image_url || user.imageUrl; // خزنه هنا
                await user.save();
                console.log(`User ${id} updated`);
            } else {
                user = new User({
                    clerkUserId: id,
                    email: email_addresses?.email_address,
                    name,
                    imageUrl: profile_image_url, // خزنه في إنشاء المستخدم الجديد
                });
                await user.save();
                console.log(`User ${id} created`);
            }

        }

        res.status(200).json({ success: true, message: 'Webhook processed' });
    } catch (error) {
        console.log('Error processing webhook:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};