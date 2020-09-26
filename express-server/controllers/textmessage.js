const Nexmo = require('nexmo')
 
const nexmo = new Nexmo({
  apiKey: 'e9caa693',
  apiSecret: 'kBR3GTuqOjb1Tqzw',
})
 


const from = 'Vonage APIs';
const to = '61403583241';
const text = 'Hello from Vonage SMS API';

 
nexmo.message.sendSms(from, to, text, {
  type: "unicode"
}, (err, responseData) => {
  if (err) {
    console.log(err);
  } else {
    if (responseData.messages[0]['status'] === "0") {
      console.log("Message sent successfully.");
    } else {
      console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
    }
  }
})
