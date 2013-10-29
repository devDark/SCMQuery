        /* Init Namespace and short link to Global Scope */
        "use strict";
        (function (w) {
            w.w=w;
            if (!!w.SCMQuery) {
                w.SCMQuery = undefined;
                delete w.SCMQuery;
            }
        }(window);
        var SCMQuery = undefined;
        /* Init Core */
        SCMQuery = new function SCMQuery() {
            var self = this;
            self.GS = new function SCMQuery_GS() {
                this.__name__ = "SCMQuery - Garbage storage";
            };
            self.win = window;
            self.doc = this.win.document;
            self.loc = this.win.location || this.doc.location;
            self.nav = this.win.navigator;
            self.usrag = this.nav.userAgent;
            self.ua = this.usrag.toLowerCase();
            self.appver = this.nav.appVersion;
            self.av = this.appver.toLowerCase();
            self.screen = this.win.screen;
            if (typeof (self.win.addEventListener) != "undefined") {
                self.addEvent = function (elem, type, handler, type2) {
                    type2 = undefined;
                    elem.addEventListener(type, handler, false);
                };
                self.removeEvent = function (elem, type, handler, type2) {
                    type2 = undefined;
                    elem.removeEventListener(type, handler, false);
                };
            } else if (typeof (self.win.attachEvent) != "undefined") {
                self.addEvent = function (elem, type, handler, type2) {
                    if (typeof (type2) != "string") {
                        type = undefined;
                        type = type2;
                    }
                    elem.attachEvent("on" + type, handler);
                };
                self.removeEvent = function (elem, type, handler, type2) {
                    if (typeof (type2) != "string") {
                        type = undefined;
                        type = type2;
                    }
                    elem.detachEvent("on" + type, handler);
                };
            }
            var docReadyState = false;
            self.addEvent(self.doc, "DOMContentLoaded", function () {
                docReadyState = true;
                self.removeEvent(self.doc, "DOMContentLoaded", arguments.callee, "readystatechange");
            }, "readystatechange");
            var drlist = new Array();
            self.docReady = function (fn) {
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
            var drlistid = self.win.setInterval(function () {
                if (docReadyState == true || self.doc.readyState == "complete") {
                    if (docReadyState != true) {
                        docReadyState = true;
                    }
                    if (drlist.length == 0) {
                        self.win.clearInterval(drlistid);
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
            self.GetCurrentOS = (function () {
                var curos = "UnknownOS";
                if (self.ua.indexOf("win") != -1 || self.av.indexOf("win") != -1) {
                    curos = "windows";
                } else if (self.ua.indexOf("mac") != -1 || self.av.indexOf("mac") != -1) {
                    curos = "osx";
                } else if (self.ua.indexOf("x11") != -1 || self.av.indexOf("x11") != -1 || self.ua.indexOf("linux") != -1 || self.av.indexOf("linux") != -1) {
                    curos = "linux";
                } else if (self.ua.indexOf("brew") != -1 || self.av.indexOf("brew") != -1 || self.ua.indexOf("obigo") != -1 || self.av.indexOf("obigo") != -1) {
                    curos = "brew";
                }
                return curos;
            })();
            self.ajax = (function () {
                var xhr = null;
                try {
                    new self.win.XMLHttpRequest();
                    xhr = function () {
                        return (new self.win.XMLHttpRequest());
                    };
                } catch (e) {
                    try {
                        new self.win.ActiveXObject('Msxml2.XMLHTTP.6.0');
                        xhr = function () {
                            return (new self.win.ActiveXObject('Msxml2.XMLHTTP.6.0'));
                        };
                    } catch (e) {} finally {}
                    try {
                        new self.win.ActiveXObject('Msxml2.XMLHTTP.5.0');
                        xhr = function () {
                            return (new self.win.ActiveXObject('Msxml2.XMLHTTP.5.0'));
                        };
                    } catch (e) {} finally {}
                    try {
                        new self.win.ActiveXObject('Msxml2.XMLHTTP.4.0');
                        xhr = function () {
                            return (new self.win.ActiveXObject('Msxml2.XMLHTTP.4.0'));
                        };
                    } catch (e) {} finally {}
                    try {
                        new self.win.ActiveXObject('Msxml2.XMLHTTP.3.0');
                        xhr = function () {
                            return (new self.win.ActiveXObject('Msxml2.XMLHTTP.3.0'));
                        };
                    } catch (e) {} finally {}
                    try {
                        new self.win.ActiveXObject('Msxml2.XMLHTTP');
                        xhr = function () {
                            return (new self.win.ActiveXObject('Msxml2.XMLHTTP'));
                        };
                    } catch (e) {} finally {}
                    try {
                        new self.win.ActiveXObject('Microsoft.XMLHTTP');
                        xhr = function () {
                            return (new self.win.ActiveXObject('Microsoft.XMLHTTP'));
                        };
                    } catch (e) {} finally {}
                } finally {}
                return xhr;
            })();
            self.Log = function (strlog, method) {
                method = method || 'log';
                var console = SCMQuery.win.console;
                if (!!console[method]) {
                    return console[method](strlog);
                }
            };
        };
