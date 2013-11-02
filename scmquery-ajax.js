"use strict";
(function($) {
    var serialize = function(obj) {
        var stack = new Array(),
        idx = null;
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
    ajax = function(options) {
        var defaultOptions = {
            'type' : 'GET',
            'url' : '',
            'timeout' : 2e3,
            'onSuccess' : function(){},
            'onComplete' : function(){},
            'onError' : function(){},
            'data' : null,
            'async' : true,
            'execjs' : false
        };
        if($.isString(options.data) && options.data.length > 0) {
            defaultOptions.type = 'POST';
        }
        var options = {
            'type' : options.type || defaultOptions.type,
            'url' : options.url || defaultOptions.url,
            'timeout' : options.timeout || defaultOptions.timeout,
            'onSuccess' : options.onSuccess || defaultOptions.onSuccess,
            'onComplete' : options.onComplete || defaultOptions.onComplete,
            'onError' : options.onError || defaultOptions.onError,
            'data' : options.data || defaultOptions.data,
            'async' : options.async || defaultOptions.async,
            'execjs' : options.execjs || defaultOptions.execjs
        },
        timeoutTime = options.timeout,
        requestDone = false,
        requestSuccess = function(req) {
            var status = false;
            try {
                status = !req.status && $.loc.protocol == "file:" ||
                (req.status >= 200 && req.status < 300 ) ||
                req.status == 304 ||
                $.ua.indexOf('safari') !== 1 && typeof(req.status == 'undefined');
                return status;
            } catch (e) {
                $.Log(e, 'error');
            } finally {}
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
        request = $.XMLRequest();
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
        if (options.type === 'POST') {
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send(serialize(options.data));
        } else {
            request.send(options.data);
        }
  };

  this.ajax = ajax;
})(SCMQuery);
