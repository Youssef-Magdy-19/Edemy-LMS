import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  console.log('Received webhook request');
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);

  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(req.body, {  // خليها raw body لو تستخدم bodyParser.raw
      "svix-id": req.headers['svix-id'],
      "svix-timestamp": req.headers['svix-timestamp'],
      "svix-signature": req.headers['svix-signature'],
    });
    console.log('Webhook verified');

    const { data, type } = req.body;
    console.log('Event type:', type);
    console.log('Event data:', data);

    const userData = {
      clerkUserId: data.id,
      name: (data.first_name || "") + " " + (data.last_name || ""),
      email: data.email_addresses?.email_address || '',
      imageUrl: data.image_url || '',
    };

    switch (type) {
      case 'user.created':
        console.log('Creating user...');
        await User.create(userData);
        break;

      case 'user.updated':
        console.log('Updating user...');
        await User.findOneAndUpdate(
          { clerkUserId: data.id },
          userData,
          { new: true, upsert: true }
        );
        break;

      case 'user.deleted':
        console.log('Deleting user...');
        await User.findOneAndDelete({ clerkUserId: data.id });
        break;

      default:
        console.log('Unhandled event type:', type);
    }

    return res.status(200).json({});

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({ error: error.message });
  }
};

export default clerkWebhooks