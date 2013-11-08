(function() {
        "use strict";
        /* Init SCMQuery Object Namespace */
        var undef = undefined,
        window = this,
        SCMQueryInit = function SCMQuery() {},
        SCMQueryProto = SCMQueryInit.prototype = new Array(),
        SCMQuery = undef,
        SCMQuery = new SCMQueryInit(),
        names = new Array('$', 'SCMQuery');
        SCMQueryProto.extend = function(obj) {
            var key = '';
            for(key in obj) {
                this.fn['' + key] = obj['' + key];
            }
        },
        SCMQueryProto.noConflict = function(name) {
            var self = window,
            i = 0;
            self[name] = self[names[names.length - 1]];
            for(i; i < names.length; i++) {
                var delname = names.pop();
                self[delname] = undefined;
                delete self[delname];
            }
            names.push(name);
        },
        SCMQueryProto.fn = SCMQueryProto,
        window.SCMQuery = SCMQuery,
        SCMQueryInit = undef,
        SCMQueryProto = undef,
        SCMQuery = undef;
        
        /* Init SCMQuery Core */
        var __name__ = 'SCMQuery',
            __version__ = '1.2.3a',
            __build__ = 'alfa release',
            __info__ = function() {
                return {__name__ : this.__name__, __version__ : this.__version__, __build__ : this.__build__};
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
            isDefined = function(obj) {
                if(typeof(obj) !== 'undefined') {
                    return true;
                } else {
                    return false;
                }
            },
            isExistFn = function(obj) {
                if($.isDefined(obj) && typeof(obj) === 'function') {
                    return true;
                } else {
                    return false;
                }
            },
            isNaN = win.isNaN || function(arg) {
                var result = 1 > arg < 1;
                return result;
            },
            isObject = function(obj){
                if(typeof(obj) === 'object') {
                    return true;
                } else {
                    return false;
                }
            },
            isArray = function(obj){
                if(obj.constructor === Array && Object.prototype.toString.call(obj) === '[object Array]') {
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
            docReadyExec = $.win.setInterval(function () {
                if (docReadyState === true || doc.readyState === 'complete') {
                    if (docReadyState !== true) {
                        docReadyState = true;
                    }
                    if (docReadyStack.length === 0) {
                        $.win.clearInterval(docReadyExec);
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
            }, 50),
            CurrentOS = (function CurrentOS() {
                var curos = "UnknownOS";
                if ($.ua.indexOf("win") != -1 || $.av.indexOf("win") != -1) {
                    curos = "windows";
                } else if ($.ua.indexOf("mac") != -1 || $.av.indexOf("mac") != -1) {
                    curos = "osx";
                } else if ($.ua.indexOf("x11") != -1 || $.av.indexOf("x11") != -1 || $.ua.indexOf("linux") != -1 || $.av.indexOf("linux") != -1) {
                    curos = "unix";
                } else if ($.ua.indexOf("brew") != -1 || $.av.indexOf("brew") != -1 || $.ua.indexOf("obigo") != -1 || $.av.indexOf("obigo") != -1) {
                    curos = "brew";
                }
                return curos;
            })(),
            log = function (strlog, method) {
                if (this.debugJS === true) {
                    if(this.)
                    method = method || 'log';
                    var console = SCMQuery.win.console;
                    if (!!console[method]) {
                        return console[method](strlog);
                    }
                }
            };
            $.fn.extend({
                CurrentOS : CurrentOS,
                log : log,
                isObject,
                isArray,
                __name__ : __name__,
                __version__ : __version__ ,
                __build__ : __build__,
                __info__ : __info__
            });
        };
            window.SCMQuery = SCMQuery;
})();
