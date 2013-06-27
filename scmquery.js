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
                SCMQuery.addEvent = function (elem, type, type2, handler) {
                    type2 = undefined;
                    elem.addEventListener(type, handler, false);
                };
            } else if (typeof (SCMQuery.win.attachEvent) != "undefined") {
                SCMQuery.addEvent = function (elem, type, type2, handler) {
                    if (typeof (type2) != "string") {
                        type = undefined;
                        type = type2;
                    }
                    elem.attachEvent("on" + type, handler);
                };
            }
            if (typeof (SCMQuery.win.addEventListener) != "undefined") {
                SCMQuery.removeEvent = function (elem, type, type2, handler) {
                    type2 = undefined;
                    elem.removeEventListener(type, handler, false);
                };
            } else if (typeof (SCMQuery.win.attachEvent) != "undefined") {
                SCMQuery.removeEvent = function (elem, type, type2, handler) {
                    if (typeof (type2) != "string") {
                        type = undefined;
                        type = type2;
                    }
                    elem.detachEvent("on" + type, handler);
                };
            }
            SCMQuery.docReadyState = false;
            SCMQuery.addEvent(SCMQuery.doc, "DOMContentLoaded", "readystatechange", function () {
                SCMQuery.docReadyState = true;
                SCMQuery.removeEvent(SCMQuery.doc, "DOMContentLoaded", "readystatechange", arguments.callee);
            });
            SCMQuery.GCS.drlist = new Array();
            SCMQuery.docReady = function (fn) {
                if (SCMQuery.docReadyState == true) {
                       if (typeof (fn) == "function") {
                           fn.call();
                       } else {
                           (new Function(fn)).call();
                       }
                } else {
                    SCMQuery.GCS.drlist.push(fn);
                }
            };
            SCMQuery.GCS.drlistid = SCMQuery.win.setInterval(function () {
                if (SCMQuery.docReadyState == true || SCMQuery.doc.readyState == "complete") {
                    if (SCMQuery.docReadyState != true) {
                        SCMQuery.docReadyState = true;
                    }
                    if (SCMQuery.GCS.drlist.length == 0) {
                        SCMQuery.win.clearInterval(SCMQuery.GCS.drlistid);
                        delete SCMQuery.GCS.drlist;
                        delete SCMQuery.GCS.drlistid;
                    } else {
                        var drlisttmp = SCMQuery.GCS.drlist.shift();
                        if (typeof (drlisttmp) == "function") {
                            drlisttmp.call();
                        } else {
                            (new Function(drlisttmp)).call();
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
            }).call();
        }).call();
