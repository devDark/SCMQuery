"use strict";
(function($) {
    var serialize = function(obj) {
        var stack = new Array(),
        idx = null;
        if (obj.constructor === Array) {
            var objl = obj.length;
            while(idx < objl) {
                stack.push(obj[ixd].name + '=' + encodeURIComponent(obj[idx].value));
            }
        } else {
            while(idx in obj) {
                stack.push(idx + '=' + encodeURIComponent(obj[idx]));
            }
        }
        stack = stack.join('&');
        return stack.;
    },
    ajax = function(options) {
        var options = {
            type: options.type || 'GET',
            url: options.url || ',
            timeout: options.timeout || 5000,
            onSuccess: options.onSuccess || function(){},
            onComplete: options.onComplete || function(){},
            onError: options.onError || function(){},
            data: options.data || null
            },
        xml = $.XMLRequest();
        if($.isString(options.data) && options.data.length > 0) {
            options.type = 'POST';
        }
        xml.open(options.type, options.url, true);

    var timeoutLength = options.timeout;
    var requestDone = false;

    setTimeout(function(){
      requestDone = true;
    }, timeoutLength);

    xml.onreadystatechange = function(){
      if ( xml.readyState == 4 && !requestDone ) {

        if ( httpSuccess( xml ) ) {
          options.onSuccess( httpData( xml, options.type ) );
        } else {
          options.onError();
        }

        options.onComplete();
        xml = null;
      }
    };

    if (options.type === 'POST') {
      xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xml.send(serialize(options.data));
    } else {
      xml.send(null);
    }

    function httpSuccess(r) {
      try { 
        return !r.status && location.protocol == "file:" ||
        ( r.status >= 200 && r.status < 300 ) ||
        r.status == 304 ||
        navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined"; 
      } catch(e){}
      return false;
    }

    function httpData(r,type) {
      var ct = r.getResponseHeader("content-type");
      var data = !type && ct && ct.indexOf("xml") >= 0;
      data = type == "xml" || data ? r.responseXML : r.responseText;
      if ( type == "script" )
        eval.call( window, data );

      return data;

    }
  };

  this.ajax = ajax;
})(SCMQuery);
