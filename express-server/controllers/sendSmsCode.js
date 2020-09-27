const SMS_ACTIVE = true;

const Nexmo = require('nexmo')
const {config} = require("../config");

const nexmo = new Nexmo({
  apiKey: config.nexmoKey,
  apiSecret: config.nexmoSecret,
})
 
const from = 'Prescript';

function sendSmsCode(code, to) {
  if (SMS_ACTIVE) {
    const msg = 'Your Prescript verification code is: ' + code + '. Please do not reply.';
    console.log('sending to ' + to + ': ' + msg);
    nexmo.message.sendSms(from, to, msg, {
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