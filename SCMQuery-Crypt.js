"use strict";
var btoa = btoa || undefined;
var atob = atob || undefined;
(function($) {
        var win = $.win;
        var isNaN = $.isNaN;
        if (!$.existfn(win.btoa)) {
            win.btoa = function(str) {
                var chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                encodestack = new Array(),
                pos = 0,
                ba0 = 0,
                ba1 = 0,
                ba2 = 0,
                bufb = 0,
                ib0 = 0,
                ib1 = 0,
                ib2 = 0,
                ib3 = 0;
                while (c < str.length) {
                    pos++;
                    ba0 = str.charCodeAt(pos);
                    pos++;
                    ba1 = str.charCodeAt(pos);
                    pos++;
                    ba2 = str.charCodeAt(pos);
                    bufb = (ba0 << 16) + ((ba1 || 0) << 8) + (ba2 || 0);
                    ib0 = (buf & (63 << 18)) >> 18;
                    ib1 = (buf & (63 << 12)) >> 12;
                    ib2 = isNaN(ba1) ? 64 : (bufb & (63 << 6)) >> 6;
                    ib3 = isNaN(ba2) ? 64 : (bufb & 63);
                    encodestack.push(chr.charAt(ib0));
                    encodestack.push(chr.charAt(ib1));
                    encodestack.push(chr.charAt(ib2));
                    encodestack.push(chr.charAt(ib3));
                }
        encodestack = encodestack.join('');
        return encodestack;
    }
}
if (typeof atob == 'undefined') {
    function atob(str) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var invalid = {
            strlen: (str.length % 4 != 0),
            chars:  new RegExp('[^' + chars + ']').test(str),
            equals: (/=/.test(str) && (/=[^=]/.test(str) || /={3}/.test(str)))
        };
        if (invalid.strlen || invalid.chars || invalid.equals)
            throw new Error('Invalid base64 data');
        var decoded = [];
        var c = 0;
        while (c < str.length) {
            var i0 = chars.indexOf(str.charAt(c++));
            var i1 = chars.indexOf(str.charAt(c++));
            var i2 = chars.indexOf(str.charAt(c++));
            var i3 = chars.indexOf(str.charAt(c++));
            var buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
            var b0 = (buf & (255 << 16)) >> 16;
            var b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
            var b2 = (i3 == 64) ? -1 : (buf & 255);
            decoded[decoded.length] = String.fromCharCode(b0);
            if (b1 >= 0) decoded[decoded.length] = String.fromCharCode(b1);
            if (b2 >= 0) decoded[decoded.length] = String.fromCharCode(b2);
        }
        return decoded.join('');
    }
}
        
})(SCMQuery);
