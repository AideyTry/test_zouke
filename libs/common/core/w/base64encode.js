/**
 * Created by wangkehan on 16/10/27.
 */

const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;

function cb_utob(c) {
    const fromCharCode = String.fromCharCode;
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
        + fromCharCode(0x80 | (cc & 0x3f)))
            : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
        + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
        + fromCharCode(0x80 | ( cc         & 0x3f)));
    } else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
        + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
        + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
        + fromCharCode(0x80 | ( cc         & 0x3f)));
    }
}
function utob(u) {
    return u.replace(re_utob, cb_utob);
}
const b64chars
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function cb_encode(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            b64chars.charAt( ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
    return chars.join('');
}

function btoa(b){
    const _g = typeof window ==='undefined' ? global:window;
    if(_g.btoa) return _g.btoa(b);
    else return b.replace(/[\s\S]{1,3}/g, cb_encode)
}

function encode(u){
    return btoa(utob(u))
}

export default function base64encode(u) {
    return encode(String(u)).replace(/[+\/]/g, function(m0) {
        return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
};