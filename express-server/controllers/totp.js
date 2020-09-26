const crypto = require('crypto');
const mongoose = require('mongoose');
const { userInfo } = require('os');
// const { default: PatientOTP } = require('../../react-frontend/src/App/pages/PatientOTP');
const Patient = mongoose.model('Patient');

// From https://github.com/jhermsmeier/node-hotp/blob/master/lib/hotp.js with minor edits
function zeropad(value, digits) {
    const fill = '0'.repeat(digits)
    return (fill + value).slice(-digits)
}

function getCounter(value) {
    if (Number.isFinite(value)) {
        return zeropad(value.toString(16));
    } else {
        return zeropad(value);
    }
}

/**
 * HMAC-Based One-Time Password (HOTP)
 */
async function hotp(key, counter, options = {
    algorithm: 'sha256',
    digits: 6,
}) {
    const hash = crypto.createHash(options.algorithm);
    hash.update(key.valueOf() + counter);
    const hmac = hash.digest().toString('hex');
    return zeropad(truncate(hmac, options.digits), options.digits)
}

/**
 * HOTP truncate function
 */
function truncate(hmac, digits) {
    const offset = hmac.charCodeAt(hmac.length - 1) & 0x0F
    const value = (hmac.charCodeAt(offset + 0) & 0x7F) << 24 |
        (hmac.charCodeAt(offset + 1) & 0xFF) << 16 |
        (hmac.charCodeAt(offset + 2) & 0xFF) << 8 |
        (hmac.charCodeAt(offset + 3) & 0xFF)
    return value % (10 ** digits)
}

function timestep(t, t0, ts) {
    return Math.floor((t - t0) / ts)
}

/**
 * From https://github.com/jhermsmeier/node-hotp/blob/master/lib/totp.js with minor edits.
 *
 * Time-Based One-Time Password (TOTP)
 */
async function totp(key, opts = {
    algorithm: 'sha256',
    digits: 6,
    time: Date.now() / 1000,
    timeStep: 30,
    t0: 0
}) {

    const counter = timestep(opts.time, opts.t0, opts.timeStep)
    return await hotp(key, counter, {
        algorithm: opts.algorithm,
        digits: opts.digits
    });
}

module.exports = totp;