const SMS_ACTIVE = false;

const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: 'e9caa693',
  apiSecret: 'kBR3GTuqOjb1Tqzw',
})
 
const from = 'Prescript';

function sendSmsCode(code, to) {
  if (SMS_ACTIVE) {
    nexmo.message.sendSms(from, to, 'Your Prescript verification code is: ' + code + '. Please do not reply.', {
      type: "unicode"
    }, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]['status'] === "0") {
          console.log("Sent code to " + to + " successfully.");
        } else {
          console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
      }
    });
  }
}

module.exports = sendSmsCode;