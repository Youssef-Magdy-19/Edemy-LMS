import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

export const clerkWebhooks = async (req, res) => {
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
        const bodyJson = JSON.parse(req.body.toString())

        const { data, type } = bodyJson
        console.log('Event type:', type);
        console.log('Event data:', data);

        const userData = {
            clerkUserId: data.id,
            name: (data.first_name || "") + " " + (data.last_name || ""),
            imageUrl: data.image_url || "",
        }

        // اجلب الايميل من الـ array إذا موجود ومو فاضي
        let emailToUse = null
        if (Array.isArray(data.email_addresses) && data.email_addresses.length > 0) {
            const firstEmail = data.email_addresses[0]?.email_address
            if (firstEmail && firstEmail.trim() !== "") {
                emailToUse = firstEmail
            }
        }
        if (emailToUse) {
            userData.email = emailToUse
        }

        console.log(userData)

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

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

// export const stripeWebhooks = async (request, response) =>{
//     const sig = request.headers['stripe-signature']

//     let event

//     try{
//         event = Stripe.Webhooks.constructEvent (request.body , sig, process.env.STRIPE_WEBHOOK_SECRET)
//     } catch (error) {
//         response.status(500).send(`webhook Error: ${error.message}`)
//     }

//     // Handle the event 
//     switch (event.type) {
//         case 'payment_intent_succeeded' : {
//             const paymentIntent = event.data.object
//             const paymentIntentId = paymentIntent.id

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId
//             })

//             const { purchaseId } = session.data[0].metadata

//             const purchaseData = await Purchase.findById(purchaseId)
//             const userData = await User.findById(purchaseData.userId)
//             const courseData = await Course.findById(purchaseData.courseId.toString())

//             courseData.enrolledStudents.push(userData)
//             await courseData.save()

//             userData.enrolledCourses.push(courseData._id)
//             await userData.save()

//             purchaseData.status = 'completed'
//             await purchaseData.save()

//             break;
//         }

//         case 'payment_intent.payment_failed' : {
//             const paymentIntent = event.data.object
//             const paymentIntentId = paymentIntent.id

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId
//             })

//             const { purchaseId } = session.data[0].metadata
//             const purchaseData = await Purchase.findById(purchaseId)
//             purchaseData.status = 'failed'
//             await purchaseData.save()

//             break;
//         }
//         // handle other event types
//         default:
//             console.log(`Unhandled event type ${event.type}`)
//     }

//     // Return a response to acknowledge receipt of the event 
//     response.json({received: true})
// }

// if (event.type === 'checkout.session.completed') {
    //     const session = event.data.object;
    //     const purchaseId = session.metadata.purchaseId;
    //     const purchaseData = await Purchase.findById(purchaseId);

    //     if (purchaseData) {
    //         await User.findByIdAndUpdate(
    //             purchaseData.userId,
    //             { $addToSet: { enrolledCourses: purchaseData.courseId } }
    //         );

    //         await Course.findByIdAndUpdate(
    //             purchaseData.courseId,
    //             { $addToSet: { enrolledStudents: purchaseData.userId } }
    //         );
    //     }
    // }


export const stripeWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = Stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${ err.message }`);
    }

    // Handle the event 
    switch (event.type) {
        case 'payment_intent.succeeded' : {
            const paymentIntent = event.data.object
            const paymentIntentId = paymentIntent.id

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const { purchaseId } = session.data[0].metadata

            const purchaseData = await Purchase.findById(purchaseId)
            const userData = await User.findById(purchaseData.userId)
            const courseData = await Course.findById(purchaseData.courseId.toString())

            courseData.enrolledStudents.push(userData)
            await courseData.save()

            userData.enrolledCourses.push(courseData._id)
            await userData.save()

            purchaseData.status = 'completed'
            await purchaseData.save()

            break;
        }

        case 'payment_intent.payment_failed' : {
            const paymentIntent = event.data.object
            const paymentIntentId = paymentIntent.id

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const { purchaseId } = session.data[0].metadata
            const purchaseData = await Purchase.findById(purchaseId)
            purchaseData.status = 'failed'
            await purchaseData.save()

            break;
        }
        // handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true });
};
