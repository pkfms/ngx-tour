(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/router'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-tour-core', ['exports', '@angular/common', '@angular/core', '@angular/router', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['ngx-tour-core'] = {}, global.ng.common, global.ng.core, global.ng.router, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, router, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    (function (TourState) {
        TourState[TourState["OFF"] = 0] = "OFF";
        TourState[TourState["ON"] = 1] = "ON";
        TourState[TourState["PAUSED"] = 2] = "PAUSED";
    })(exports.TourState || (exports.TourState = {}));
    var TourService = /** @class */ (function () {
        function TourService(router) {
            this.router = router;
            this.stepShow$ = new rxjs.Subject();
            this.stepHide$ = new rxjs.Subject();
            this.initialize$ = new rxjs.Subject();
            this.start$ = new rxjs.Subject();
            this.end$ = new rxjs.Subject();
            this.pause$ = new rxjs.Subject();
            this.resume$ = new rxjs.Subject();
            this.anchorRegister$ = new rxjs.Subject();
            this.anchorUnregister$ = new rxjs.Subject();
            this.events$ = rxjs.merge(this.stepShow$.pipe(operators.map(function (value) { return ({ name: 'stepShow', value: value }); })), this.stepHide$.pipe(operators.map(function (value) { return ({ name: 'stepHide', value: value }); })), this.initialize$.pipe(operators.map(function (value) { return ({ name: 'initialize', value: value }); })), this.start$.pipe(operators.map(function (value) { return ({ name: 'start', value: value }); })), this.end$.pipe(operators.map(function (value) { return ({ name: 'end', value: value }); })), this.pause$.pipe(operators.map(function (value) { return ({ name: 'pause', value: value }); })), this.resume$.pipe(operators.map(function (value) { return ({ name: 'resume', value: value }); })), this.anchorRegister$.pipe(operators.map(function (value) { return ({
                name: 'anchorRegister',
                value: value
            }); })), this.anchorUnregister$.pipe(operators.map(function (value) { return ({
                name: 'anchorUnregister',
                value: value
            }); })));
            this.steps = [];
            this.anchors = {};
            this.status = exports.TourState.OFF;
            this.isHotKeysEnabled = true;
        }
        TourService.prototype.initialize = function (steps, stepDefaults) {
            if (steps && steps.length > 0) {
                this.status = exports.TourState.OFF;
                this.steps = steps.map(function (step) { return Object.assign({}, stepDefaults, step); });
                this.initialize$.next(this.steps);
            }
        };
        TourService.prototype.disableHotkeys = function () {
            this.isHotKeysEnabled = false;
        };
        TourService.prototype.enableHotkeys = function () {
            this.isHotKeysEnabled = true;
        };
        TourService.prototype.start = function () {
            this.startAt(0);
        };
        TourService.prototype.startAt = function (stepId) {
            var _this = this;
            this.status = exports.TourState.ON;
            this.goToStep(this.loadStep(stepId));
            this.start$.next();
            this.router.events
                .pipe(operators.filter(function (event) { return event instanceof router.NavigationStart; }), operators.first())
                .subscribe(function () {
                if (_this.currentStep && _this.currentStep.hasOwnProperty('route')) {
                    _this.hideStep(_this.currentStep);
                }
            });
        };
        TourService.prototype.end = function () {
            this.status = exports.TourState.OFF;
            this.hideStep(this.currentStep);
            this.currentStep = undefined;
            this.end$.next();
        };
        TourService.prototype.pause = function () {
            this.status = exports.TourState.PAUSED;
            this.hideStep(this.currentStep);
            this.pause$.next();
        };
        TourService.prototype.resume = function () {
            this.status = exports.TourState.ON;
            this.showStep(this.currentStep);
            this.resume$.next();
        };
        TourService.prototype.toggle = function (pause) {
            if (pause) {
                if (this.currentStep) {
                    this.pause();
                }
                else {
                    this.resume();
                }
            }
            else {
                if (this.currentStep) {
                    this.end();
                }
                else {
                    this.start();
                }
            }
        };
        TourService.prototype.next = function () {
            if (this.hasNext(this.currentStep)) {
                this.goToStep(this.loadStep(this.currentStep.nextStep || this.steps.indexOf(this.currentStep) + 1));
            }
        };
        TourService.prototype.hasNext = function (step) {
            if (!step) {
                console.warn('Can\'t get next step. No currentStep.');
                return false;
            }
            return (step.nextStep !== undefined ||
                this.steps.indexOf(step) < this.steps.length - 1);
        };
        TourService.prototype.prev = function () {
            if (this.hasPrev(this.currentStep)) {
                this.goToStep(this.loadStep(this.currentStep.prevStep || this.steps.indexOf(this.currentStep) - 1));
            }
        };
        TourService.prototype.hasPrev = function (step) {
            if (!step) {
                console.warn('Can\'t get previous step. No currentStep.');
                return false;
            }
            return step.prevStep !== undefined || this.steps.indexOf(step) > 0;
        };
        TourService.prototype.goto = function (stepId) {
            this.goToStep(this.loadStep(stepId));
        };
        TourService.prototype.register = function (anchorId, anchor) {
            if (!anchorId) {
                return;
            }
            if (this.anchors[anchorId]) {
                throw new Error('anchorId ' + anchorId + ' already registered!');
            }
            this.anchors[anchorId] = anchor;
            this.anchorRegister$.next(anchorId);
        };
        TourService.prototype.unregister = function (anchorId) {
            if (!anchorId) {
                return;
            }
            delete this.anchors[anchorId];
            this.anchorUnregister$.next(anchorId);
        };
        TourService.prototype.getStatus = function () {
            return this.status;
        };
        TourService.prototype.isHotkeysEnabled = function () {
            return this.isHotKeysEnabled;
        };
        TourService.prototype.goToStep = function (step) {
            var _this = this;
            if (!step) {
                console.warn('Can\'t go to non-existent step');
                this.end();
                return;
            }
            var navigatePromise = new Promise(function (resolve) { return resolve(true); });
            if (step.route !== undefined && typeof step.route === 'string') {
                navigatePromise = this.router.navigateByUrl(step.route);
            }
            else if (step.route && Array.isArray(step.route)) {
                navigatePromise = this.router.navigate(step.route);
            }
            navigatePromise.then(function (navigated) {
                if (navigated !== false) {
                    setTimeout(function () { return _this.setCurrentStep(step); });
                }
            });
        };
        TourService.prototype.loadStep = function (stepId) {
            if (typeof stepId === 'number') {
                return this.steps[stepId];
            }
            else {
                return this.steps.find(function (step) { return step.stepId === stepId; });
            }
        };
        TourService.prototype.setCurrentStep = function (step) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.currentStep) {
                                this.hideStep(this.currentStep);
                            }
                            this.currentStep = step;
                            return [4 /*yield*/, this.showStep(this.currentStep)];
                        case 1:
                            _a.sent();
                            this.router.events
                                .pipe(operators.filter(function (event) { return event instanceof router.NavigationStart; }), operators.first())
                                .subscribe(function () {
                                if (_this.currentStep && _this.currentStep.hasOwnProperty('route')) {
                                    _this.hideStep(_this.currentStep);
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        TourService.prototype.showStep = function (step) {
            return __awaiter(this, void 0, void 0, function () {
                var anchor;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            anchor = this.anchors[step && step.anchorId];
                            if (!anchor) return [3 /*break*/, 1];
                            // Anchor is registered, continue tour
                            anchor.showTourStep(step);
                            this.stepShow$.next(step);
                            return [3 /*break*/, 3];
                        case 1:
                            console.warn('Can\'t attach to unregistered anchor with id ' + step.anchorId);
                            return [4 /*yield*/, this.anchorRegister$.pipe(operators.filter(function (anchorId) { return anchorId === step.anchorId; }), operators.map(function (anchorId) { return _this.anchors[anchorId]; }), operators.takeUntil(this.end$), operators.take(1)).toPromise()];
                        case 2:
                            // Wait for anchor to register itself and continue
                            anchor = _a.sent();
                            if (anchor) {
                                anchor.showTourStep(step);
                                this.stepShow$.next(step);
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        TourService.prototype.hideStep = function (step) {
            var anchor = this.anchors[step && step.anchorId];
            if (!anchor) {
                return;
            }
            anchor.hideTourStep();
            this.stepHide$.next(step);
        };
        return TourService;
    }());
    TourService.decorators = [
        { type: core.Injectable }
    ];
    TourService.ctorParameters = function () { return [
        { type: router.Router }
    ]; };

    var TourHotkeyListenerComponent = /** @class */ (function () {
        function TourHotkeyListenerComponent(tourService) {
            this.tourService = tourService;
        }
        /**
         * Configures hot keys for controlling the tour with the keyboard
         */
        TourHotkeyListenerComponent.prototype.onEscapeKey = function () {
            if (this.tourService.getStatus() === exports.TourState.ON &&
                this.tourService.isHotkeysEnabled()) {
                this.tourService.end();
            }
        };
        TourHotkeyListenerComponent.prototype.onArrowRightKey = function () {
            if (this.tourService.getStatus() === exports.TourState.ON &&
                this.tourService.hasNext(this.tourService.currentStep) &&
                this.tourService.isHotkeysEnabled()) {
                this.tourService.next();
            }
        };
        TourHotkeyListenerComponent.prototype.onArrowLeftKey = function () {
            if (this.tourService.getStatus() === exports.TourState.ON &&
                this.tourService.hasPrev(this.tourService.currentStep) &&
                this.tourService.isHotkeysEnabled()) {
                this.tourService.prev();
            }
        };
        return TourHotkeyListenerComponent;
    }());
    TourHotkeyListenerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'tour-hotkey-listener',
                    template: "<ng-content></ng-content>"
                },] }
    ];
    TourHotkeyListenerComponent.ctorParameters = function () { return [
        { type: TourService }
    ]; };
    TourHotkeyListenerComponent.propDecorators = {
        onEscapeKey: [{ type: core.HostListener, args: ['window:keydown.Escape',] }],
        onArrowRightKey: [{ type: core.HostListener, args: ['window:keydown.ArrowRight',] }],
        onArrowLeftKey: [{ type: core.HostListener, args: ['window:keydown.ArrowLeft',] }]
    };

    var TourModule = /** @class */ (function () {
        function TourModule() {
        }
        TourModule.forRoot = function () {
            return {
                ngModule: TourModule,
                providers: [
                    TourService,
                ],
            };
        };
        return TourModule;
    }());
    TourModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [TourHotkeyListenerComponent],
                    exports: [TourHotkeyListenerComponent],
                    imports: [common.CommonModule, router.RouterModule],
                },] }
    ];

    /*
     * Public API Surface of ngx-tour-core
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TourHotkeyListenerComponent = TourHotkeyListenerComponent;
    exports.TourModule = TourModule;
    exports.TourService = TourService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-tour-core.umd.js.map
