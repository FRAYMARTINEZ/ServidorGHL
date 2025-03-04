const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const GHL_API_KEY = "pit-94452368-fbfb-492d-bcb8-0f9c76eb0d9a"; // Replace with your actual API key

// Webhook endpoint for Twilio
app.post("/webhook", async (req, res) => {
    try {
        console.log("I get the message from twilio");
        const { From, Body } = req.body; // Get sender and message content
        console.log(`📩 New WhatsApp Message from ${From}: ${Body}`);

        // Send the message to GoHighLevel
        await sendMessageToGHL(From, Body);

        res.status(200).send("✅ Webhook received");
    } catch (error) {
        console.error("❌ Error processing webhook:", error);
        res.status(500).send("❌ Internal Server Error");
    }
});

app.get("", async (req, res) => {
    try {
        // Send the message to GoHighLevel
        await sendMessageToGHL("3116649959", "Hi, it's me!");

        res.status(200).send("✅ Webhook received");
    } catch (error) {
        console.error("❌ Error processing webhook:", error);
        res.status(500).send("❌ Internal Server Error");
    }
})

// Function to send messages to GoHighLevel
async function sendMessageToGHL(contactNumber, message) {
    // const ghlUrl = "https://services.leadconnectorhq.com/hooks/BK8GDEmArVQr0bhYJbaS/webhook-trigger/4687e6c7-6b87-49fd-9ede-bcca169035b3";
    // const ghlUrl = "https://hooks.zapier.com/hooks/catch/21885195/2gxud2j/";
    const ghlUrl = [
        "https://hooks.zapier.com/hooks/catch/21885195/2gxud2j/",
        "https://services.leadconnectorhq.com/hooks/BK8GDEmArVQr0bhYJbaS/webhook-trigger/4687e6c7-6b87-49fd-9ede-bcca169035b3"
    ];
    try {
        for(let i = 0 ; i < 2 ; i ++){

            const response = await axios.post(
                ghlUrl[i],
                {
                    phone: contactNumber, // Contact's phone number in GHL
                    message: message,
                    type: "SMS" // Can be "WHATSAPP" if GHL supports it
                },
                {
                    headers: { Authorization: `Bearer ${GHL_API_KEY}` }
                }
            );

            console.log("✅ Message sent to GHL:", response.data);
        }
    } catch (error) {
        console.error("❌ Error sending to GHL:", error.response?.data || error.message);
    }
}

// Start the webhook server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Webhook server running on port http://127.0.0.1:${PORT}`);
});
