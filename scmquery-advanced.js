"use strict";
var btoa = btoa || undefined,
atob = atob || undefined;
(function($) {
        var win = $.win,
        isNaN = $.isNaN,
        mt_rand = function(min, max) {
            var defaultOptions = {
                'min' : 0x0,
                'max' : 0x7fffffff
            },
            options = {
                'min' : parseInt(min, 10) || defaultOptions.min,
                'max' : parseInt(max, 10) || defaultOptions.max
            },
            rand = 0;
            if(max === undefined) {
                throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
            }
            rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return rand;
        },
        /* base64_encode with Unicode native support */
        btoa = function(str) {
            var chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            encodestack = new Array(),
            strl = str.length,
            idxb = 0,
            ba = new Array(3),
            bufb = 0,
            ib = new Array(4);
            while (idxb < strl) {
                ba[0] = str.charCodeAt(idxb);
                idxb += 1;
                ba[1] = str.charCodeAt(idxb);
                idxb += 1;
                ba[2] = str.charCodeAt(idxb);
                idxb += 1;
                bufb = (ba[0] << 16) + ((ba[1] || 0) << 8) + (ba[2] || 0);
                ib[0] = (bufb & (0x3f << 18)) >> 18;
                ib[1] = (bufb & (0x3f << 12)) >> 12;
                ib[2] = isNaN(ba[1]) ? 0x40 : (bufb & (0x3f << 6)) >> 6;
                ib[3] = isNaN(ba[2]) ? 0x40 : (bufb & 0x3f);
                encodestack.push(chr.charAt(ib[0]));
                encodestack.push(chr.charAt(ib[1]));
                encodestack.push(chr.charAt(ib[2]));
                encodestack.push(chr.charAt(ib[3]));
            }
            encodestack = encodestack.join('');
            return encodestack;
        },
        /* base64_decode with Unicode native support */
        atob = function(str) {
            var chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            invalid = new Array(
                (str.length % 4 !== 0),
                new RegExp('[^' + chars + ']').test(str),
                (/=/.test(str) && (/=[^=]/.test(str) || /={3}/.test(str)))
            ),
            decodestack = new Array(),
            strl = str.length,
            idxb = 0,
            ba = new Array(3),
            bufb = 0,
            ib = new Array(4);
            if (invalid[0] || invalid[1] || invalid[2]) {
                throw new Error('Invalid input base64 data');
            }
            while (idxb < strl) {
                ib[0] = chr.indexOf(str.charAt(idxb));
                idxb += 1;
                ib[1] = chr.indexOf(str.charAt(idxb));
                idxb += 1;
                ib[2] = chr.indexOf(str.charAt(idxb));
                idxb += 1;
                ib[3] = chr.indexOf(str.charAt(idxb));
                idxb += 1;
                bufb = (ib[0] << 0x12) + (ib[1] << 0xc) + ((ib[2] & 0x3f) << 6) + (ib[3] & 0x3f);
                ba[0] = (bufb & (0xff << 0x10)) >> 0x10;
                ba[1] = (ib[2] == 0x40) ? -1 : (bufb & (0xff << 8)) >> 8;
                ba[2] = (ib[3] == 0x40) ? -1 : (bufb & 0xff);
                decodestack.push(String.fromCharCode(ba[0]));
                if (ba[1] >= 0) {
                    decodestack.push(String.fromCharCode(ba[1]));
                }
                if (ba[2] >= 0) {
                    decodestack.push(String.fromCharCode(ba[2]));
                }
            }
            decodestack = decodestack.join('');
            return decodestack;
        };
        $.extend('base64_encode', btoa);
        $.extend('base64_decode', atob);
        $.extend('mt_rand', mt_rand);
        if (!$.existfn(win.btoa)) {
            win.btoa = $.base64_decode;
        }
        if (!$.existfn(win.atob)) {
            win.atob = $.base64_decode;
        }
})(SCMQuery);
