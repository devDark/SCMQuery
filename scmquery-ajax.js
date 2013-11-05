"use strict";
(function($) {
    /* Serialize params will be query send */
    var serialize = function(obj) {
        var idx, stack = new Array();
        if ($.isArray(obj)) {
            var objl = obj.length;
            while(idx < objl) {
                stack.push(obj[idx].name + '=' + encodeURIComponent(obj[idx].value));
            }
        } else {
            for(idx in obj) {
                stack.push(idx + '=' + encodeURIComponent(obj[idx]));
            }
        }
        stack = stack.join('&');
        return stack;
    },
    /* Method overload hack for support old browsers to create XMLHttpRequest */
    xmlhttprequest = (function() {
        var xhr = (function() {
            var testxhr = new $.win.XMLHttpRequest()
            testxhr = null,
            xhrfn = function() {
                var xmlhttp = new $.win.XMLHttpRequest();
                return xmlhttp;
            };
            return xhrfn;
        })() || (function() {
            var testxhr = new $.win.ActiveXObject('Msxml2.XMLHTTP.6.0')
            testxhr = null,
            xhrfn = function() {
                var xmlhttp = new $.win.ActiveXObject('Msxml2.XMLHTTP.6.0');
                return xmlhttp;
            };
            return xhrfn;
        })() || (function() {
            var testxhr = new $.win.ActiveXObject('Msxml2.XMLHTTP.5.0')
            testxhr = null,
            xhrfn = function() {
                var xmlhttp = new $.win.ActiveXObject('Msxml2.XMLHTTP.5.0');
                return xmlhttp;
            };
            return xhrfn;
        })() || (function() {
            var testxhr = new $.win.ActiveXObject('Msxml2.XMLHTTP.4.0')
            testxhr = null,
            xhrfn = function() {
                var xmlhttp = new $.win.ActiveXObject('Msxml2.XMLHTTP.4.0');
                return xmlhttp;
            };
            return xhrfn;
        })() || (function() {
            var testxhr = new $.win.ActiveXObject('Msxml2.XMLHTTP.3.0')
            testxhr = null,
            xhrfn = function() {
                var xmlhttp = new $.win.ActiveXObject('Msxml2.XMLHTTP.3.0');
                return xmlhttp;
            };
            return xhrfn;
        })() || (function() {
            var testxhr = new $.win.ActiveXObject('Msxml2.XMLHTTP')
            testxhr = null,
            xhrfn = function() {
                var xmlhttp = new $.win.ActiveXObject('Msxml2.XMLHTTP');
                return xmlhttp;
            };
            return xhrfn;
        })() || (function() {
            var testxhr = new $.win.ActiveXObject('Microsoft.XMLHTTP'),
            testxhr = null,
            xhrfn = function() {
                var xmlhttp = new $.win.ActiveXObject('Microsoft.XMLHTTP');
                return xmlhttp;
            };
            return xhrfn;
        })();
        return xhr;
    })();
    ajax = function(options) {
        var options = $.extend({
            'type' : 'GET',
            'url' : '',
            'timeout' : 2e3,
            'onSuccess' : function(){},
            'onComplete' : function(){},
            'onError' : function(){},
            'data' : null,
            'async' : true,
            'execjs' : false
        }, options);
        if($.isString(options.data) && !$.isEmpty(options.data)) {
            options.type = 'POST';
        } else {
            options.type = options.type.toUpperCase();
        }
        var timeoutTime = options.timeout,
        requestDone = false,
        requestSuccess = function(req) {
            var status = !req.status && $.loc.protocol == 'file:' || (req.status >= 200 && req.status < 300) || req.status === 304 || $.ua.indexOf('safari') !== 1 && $.isDefined(req.status);
            return status;
        },
        requestData = function(req, type) {
            var contentType = req.getResponseHeader('content-type'),
            data = undefined;
            if(!type && contentType && contentType.indexOf('xml') !== -1) {
                data = type == 'xml' || data;
                data = req.responseXML;
            } else {
                data = req.responseText;
            }
            if(type === 'script' && options.execjs) {
                eval.call($.win, data);
            }
        return data;
        },
        request = $.xmlhttprequest();
        request.open(options.type, options.url, options.async);
        $.win.setTimeout(function(){
            requestDone = true;
        }, timeoutTime);
        request.onreadystatechange = function(){
            if (request.readyState === 4 && !requestDone) {
                if (requestSuccess(request)) {
                    options.onSuccess(requestData(request, options.type));
                } else {
                    options.onError();
                }
                options.onComplete();
                request = null;
            }
        };
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (options.type === 'POST') {
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send($.ajax.serialize(options.data));
        } else {
            request.send(options.data);
        }
  };
  $.fn.xmlhttprequest = xmlhttprequest || $.noop,
  $.fn.ajax = ajax || $.noop,
  $.fn.ajax.serialize = serialize || $.noop;
})(SCMQuery);
