// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC81989425deb29d3c26bc17e1983023e4';
const authToken = process.env.TWILIO_AUTH_TOKEN || '0dd69852911fc9b8097f460f8614aecc';
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Hello there! This is incoming test in twilio.",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+3116649959",
  });

  console.log(message);
}

createMessage();