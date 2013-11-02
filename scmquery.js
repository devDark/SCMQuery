        /* Init Global Namespace and short link to Global Scope */
        "use strict";
        var window = this;
        (function() {
            var w = window;
            if (!!w.SCMQuery) {
                delete w.SCMQuery;
            }
            w.SCMQuery = undefined;
            w.w = w;
        })();
        
        /* Init Core */
(function() {
        var SCMQueryProto = new function SCMQuery() {
            var self = this,
            __name__ = 'SCMQuery',
            __version__ = '1.0.3',
            __build__ = 'nonstable',
            __info__ = function() {
                return {'__name__' : __name__, '__version__' : __version__, '__build__' : __build__};
            },
            GS = function SCMQuery_GS() {
                var __name__ = 'SCMQuery - Garbage storage';
                this.__name__ = function() {
                    return {'__name__' : __name__};
                };
            },
            win = window,
            doc = win.document,
            loc = win.location || win.location,
            nav = win.navigator,
            usrag = nav.userAgent,
            ua = usrag.toLowerCase(),
            appver = nav.appVersion,
            av = appver.toLowerCase(),
            screen = win.screen,
            addEvent = undefined,
            removeEvent = undefined,
            exist = function(obj) {
                if(typeof(obj) !== 'undefined') {
                    return true;
                } else {
                    return false;
                }
            },
            existfn = function(obj) {
                if(self.exist(obj) && typeof(obj) === 'function') {
                    return true;
                } else {
                    return false;
                }
            },
            isNaN = self.win.isNaN || function(){},
            extendfn = function(extend, extendbody) {
                if(!self[extend]) {
                    self[extend] = extendbody;
                    return true;
                } else {
                    return false;
                }
            },
            docReadyState = false,
            docReadyStack = new Array(),
            docReady = undefined,
            docReadyExec = undefined,
            CurrentOS = undefined;
            extendfn('extend', extendfn);
            extendfn('extendfn', extendfn);
            extendfn('GS', new GS);
            if (typeof(self.win.addEventListener) !== 'undefined') {
                addEvent = function (elem, type, handler) {
                    elem.addEventListener(type, handler, false);
                };
                removeEvent = function (elem, type, handler) {
                    elem.removeEventListener(type, handler, false);
                };
            } else if (typeof(self.win.attachEvent) !== 'undefined') {
                self.addEvent = function (elem, type, handler) {
                    elem.attachEvent("on" + type, handler);
                };
                removeEvent = function (elem, type, handler) {
                    elem.detachEvent("on" + type, handler);
                };
            }
            extendfn('addEvent', addEvent);
            extendfn('removeEvent', removeEvent);
            addEvent(doc, 'DOMContentLoaded', function () {
                docReadyState = true;
                removeEvent(self.doc, 'DOMContentLoaded', arguments.callee);
            });
            addEvent(doc, 'readystatechange', function () {
                docReadyState = true;
                removeEvent(doc, 'readystatechange', arguments.callee);
            });
            docReady = function (fn) {
                if (docReadyState === true) {
                    if (typeof(fn) === 'function') {
                        fn();
                    } else {
                        (new Function(fn))();
                    }
                } else {
                    docReadyStack.push(fn);
                }
            };
            docReadyExec = win.setInterval(function () {
                if (docReadyState === true || doc.readyState === 'complete') {
                    if (docReadyState !== true) {
                        docReadyState = true;
                    }
                    if (docReadyStack.length === 0) {
                        win.clearInterval(docReadyExec);
                        docReadyExec = undefined;
                    } else {
                        for (var idxfn = 0; idxfn < docReadyStack.length; idxfn++) {
                            var docReadyStackPos = docReadyStack.shift();
                            if (typeof(docReadyStackPos) === 'function') {
                                docReadyStackPos();
                            } else {
                                (new Function(docReadyStackPos))();
                            }
                            docReadyStackPos = undefined;
                        }
                    }
                }
            }, 10);
            CurrentOS = (function CurrentOS() {
                var curos = "UnknownOS";
                if (self.ua.indexOf("win") != -1 || self.av.indexOf("win") != -1) {
                    curos = "windows";
                } else if (self.ua.indexOf("mac") != -1 || self.av.indexOf("mac") != -1) {
                    curos = "osx";
                } else if (self.ua.indexOf("x11") != -1 || self.av.indexOf("x11") != -1 || self.ua.indexOf("linux") != -1 || self.av.indexOf("linux") != -1) {
                    curos = "unix";
                } else if (self.ua.indexOf("brew") != -1 || self.av.indexOf("brew") != -1 || self.ua.indexOf("obigo") != -1 || self.av.indexOf("obigo") != -1) {
                    curos = "brew";
                }
                return curos;
            })();
            extendfn('CurrentOS', CurrentOS);
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
})();
