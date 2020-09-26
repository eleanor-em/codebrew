import * as Crypto from 'expo-crypto';

// HOTP/TOTP below
// From https://github.com/jhermsmeier/node-hotp/blob/master/lib/hotp.js with minor edits
function zeropad(value: number | string, digits: number = 16): string {
    const fill = '0'.repeat(digits)
    return (fill + value).slice(-digits)
}

function getCounter(value: number | string): string {
    if (Number.isFinite(value)) {
        return zeropad(value.toString(16));
    } else {
        return zeropad(value);
    }
}

/**
 * HMAC-Based One-Time Password (HOTP)
 */
async function hotp(key: string, counter: string | number, options: {
    algorithm: Crypto.CryptoDigestAlgorithm,
    digits: number
}): Promise<string> {
    const hmac = await Crypto.digestStringAsync(options.algorithm, key.valueOf() + counter);
    return zeropad(truncate(hmac, options.digits), options.digits)
}

/**
 * HOTP truncate function
 */
function truncate(hmac: string, digits: number): number {
    const offset = hmac.charCodeAt(hmac.length - 1) & 0x0F
    const value = (hmac.charCodeAt(offset + 0) & 0x7F) << 24 |
        (hmac.charCodeAt(offset + 1) & 0xFF) << 16 |
        (hmac.charCodeAt(offset + 2) & 0xFF) << 8 |
        (hmac.charCodeAt(offset + 3) & 0xFF)
    return value % (10 ** digits)
}

function timestep(t: number, t0: number, ts: number): number {
    return Math.floor((t - t0) / ts)
}

/**
 * From https://github.com/jhermsmeier/node-hotp/blob/master/lib/totp.js with minor edits.
 *
 * Time-Based One-Time Password (TOTP)
 */
async function totp(key: string, opts = {
    algorithm: Crypto.CryptoDigestAlgorithm.SHA256,
    digits: 6,
    time: Date.now() / 1000,
    timeStep: 30,
    t0: 0
}): Promise<string> {

    const counter = timestep(opts.time, opts.t0, opts.timeStep)
    return await hotp(key, counter, {
        algorithm: opts.algorithm,
        digits: opts.digits
    });
}

function totpEpoch(): number {
    return Math.floor((Date.now() / 1000) / 30);
}

function totpTimeElapsed(): number {
    return (Date.now() / 1000) % 30;
}

function isNumber(value: string): boolean {
    return value.match(/^\d+$/) != null;
}

export {
    totp,
    totpEpoch,
    totpTimeElapsed,
    isNumber
};