        if (!!window.SCMQuery) {
            window.SCMQuery = undefined;
        } else {
            var SCMQuery = undefined;
        }
        SCMQuery = new function SCMQuery() {};
        SCMQuery.GCS = new function SCMQuery_GCS() {
            this.__info__ = "SCMQuery - Garbage collection storage";
        };
        (function () {
            SCMQuery.win = window;
            SCMQuery.doc = window.document;
            SCMQuery.loc = window.location || window.document.location;
            SCMQuery.nav = window.navigator;
            SCMQuery.usrag = SCMQuery.nav.userAgent;
            SCMQuery.ua = SCMQuery.usrag.toLowerCase();
            SCMQuery.appver = SCMQuery.nav.appVersion;
            SCMQuery.av = SCMQuery.appver.toLowerCase();
            SCMQuery.screen = window.screen;
            if (typeof (SCMQuery.win.addEventListener) != "undefined") {
                SCMQuery.addEvent = function (elem, type, handler, type2) {
                    type2 = undefined;
                    elem.addEventListener(type, handler, false);
                };
            } else if (typeof (SCMQuery.win.attachEvent) != "undefined") {
                SCMQuery.addEvent = function (elem, type, handler, type2) {
                    if (typeof (type2) != "string") {
                        type = undefined;
                        type = type2;
                    }
                    elem.attachEvent("on" + type, handler);
                };
            }
            if (typeof (SCMQuery.win.addEventListener) != "undefined") {
                SCMQuery.removeEvent = function (elem, type, handler, type2) {
                    type2 = undefined;
                    elem.removeEventListener(type, handler, false);
                };
            } else if (typeof (SCMQuery.win.attachEvent) != "undefined") {
                SCMQuery.removeEvent = function (elem, type, handler, type2) {
                    if (typeof (type2) != "string") {
                        type = undefined;
                        type = type2;
                    }
                    elem.detachEvent("on" + type, handler);
                };
            }
            var docReadyState = false;
            SCMQuery.addEvent(SCMQuery.doc, "DOMContentLoaded", function () {
                docReadyState = true;
                SCMQuery.removeEvent(SCMQuery.doc, "DOMContentLoaded", arguments.callee, "readystatechange");
            }, "readystatechange");
            var drlist = new Array();
            SCMQuery.docReady = function (fn) {
                if (docReadyState == true) {
                       if (typeof (fn) == "function") {
                           fn();
                       } else {
                           (new Function(fn))();
                       }
                } else {
                    drlist.push(fn);
                }
            };
            var drlistid = SCMQuery.win.setInterval(function () {
                if (docReadyState == true || SCMQuery.doc.readyState == "complete") {
                    if (docReadyState != true) {
                        docReadyState = true;
                    }
                    if (drlist.length == 0) {
                        SCMQuery.win.clearInterval(drlistid);
                    } else {
                        var drlisttmp = drlist.shift();
                        if (typeof (drlisttmp) == "function") {
                            drlisttmp();
                        } else {
                            (new Function(drlisttmp))();
                        }
                    }
                }
            }, 10);
            SCMQuery.GetCurrentOS = (function() {
                var curos = "UnknownOS";
                if (SCMQuery.ua.indexOf("win") != -1 || SCMQuery.av.indexOf("win") != -1) {
                    curos = "windows";
                } else if (SCMQuery.ua.indexOf("mac") != -1 || SCMQuery.av.indexOf("mac") != -1) {
                    curos = "osx";
                } else if (SCMQuery.ua.indexOf("x11") != -1 || SCMQuery.av.indexOf("x11") != -1 || SCMQuery.ua.indexOf("linux") != -1 || SCMQuery.av.indexOf("linux") != -1) {
                    curos = "linux";
                } else if (SCMQuery.ua.indexOf("brew") != -1 || SCMQuery.av.indexOf("brew") != -1 || SCMQuery.ua.indexOf("obigo") != -1 || SCMQuery.av.indexOf("obigo") != -1) {
                    curos = "brew";
                }
                return curos;
            })();
            SCMQuery.ajax = (function() {
                    var xhr = null;
                    try {
                        new SCMQuery.win.XMLHttpRequest();
                        xhr = function() {new SCMQuery.win.XMLHttpRequest();};
                    } catch (e) {
                    try {
                        new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.6.0");
                        xhr = function() {new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.6.0");};
                    } catch (e) {
                    } finally {}
                    try {
                        new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.5.0");
                        xhr = function() {new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.5.0");};
                    } catch (e) {
                    } finally {}
                    try {
                        new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.4.0");
                        xhr = function() {new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.4.0");};
                    } catch (e) {
                    } finally {}
                    try {
                        new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.3.0");
                        xhr = function() {new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP.3.0");};
                    } catch (e) {
                    } finally {}
                    try {
                        new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP");
                        xhr = function() {new SCMQuery.win.ActiveXObject("Msxml2.XMLHTTP");};
                    } catch (e) {
                    } finally {}
                    try {
                        new SCMQuery.win.ActiveXObject("Microsoft.XMLHTTP");
                        xhr = function() {new SCMQuery.win.ActiveXObject("Microsoft.XMLHTTP");};
                    } catch (e) {
                    } finally {}
                } finally {}
                return xhr;
            }).call();
        }).call();
