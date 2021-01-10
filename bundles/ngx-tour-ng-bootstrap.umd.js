(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-tour-core'), require('@angular/router'), require('@angular/common'), require('@ng-bootstrap/ng-bootstrap'), require('@angular/cdk/scrolling'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-tour-ng-bootstrap', ['exports', '@angular/core', 'ngx-tour-core', '@angular/router', '@angular/common', '@ng-bootstrap/ng-bootstrap', '@angular/cdk/scrolling', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-tour-ng-bootstrap'] = {}, global.ng.core, global.ngxTourCore, global.ng.router, global.ng.common, global.ngBootstrap, global.ng.cdk.scrolling, global.rxjs, global.rxjs.operators));
}(this, (function (exports, i0, ngxTourCore, i1, common, ngBootstrap, scrolling, rxjs, operators) { 'use strict';

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

    var NgbTourService = /** @class */ (function (_super) {
        __extends(NgbTourService, _super);
        function NgbTourService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NgbTourService;
    }(ngxTourCore.TourService));
    NgbTourService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTourService_Factory() { return new NgbTourService(i0.ɵɵinject(i1.Router)); }, token: NgbTourService, providedIn: "root" });
    NgbTourService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    var TourStepTemplateService = /** @class */ (function () {
        function TourStepTemplateService() {
        }
        return TourStepTemplateService;
    }());
    TourStepTemplateService.decorators = [
        { type: i0.Injectable }
    ];

    var TourBackdropService = /** @class */ (function () {
        function TourBackdropService(rendererFactory) {
            this.renderer = rendererFactory.createRenderer(null, null);
        }
        Object.defineProperty(TourBackdropService.prototype, "backdropElement", {
            get: function () {
                return this._backdropElement;
            },
            enumerable: false,
            configurable: true
        });
        TourBackdropService.prototype.show = function (targetElement) {
            var boundingRect = targetElement.nativeElement.getBoundingClientRect();
            if (!this._backdropElement) {
                this._backdropElement = this.renderer.createElement('div');
                this.renderer.addClass(this.backdropElement, 'ngx-tour_backdrop');
                this.renderer.appendChild(document.body, this.backdropElement);
            }
            this.setStyles(boundingRect, targetElement.nativeElement);
        };
        TourBackdropService.prototype.close = function () {
            if (this._backdropElement) {
                this.renderer.removeChild(document.body, this._backdropElement);
                this._backdropElement = null;
            }
        };
        TourBackdropService.prototype.setStyles = function (boundingRect, targetElement) {
            var e_1, _a;
            var borderRadius = getComputedStyle(targetElement).borderRadius;
            var styles = {
                position: 'fixed',
                width: boundingRect.width + 'px',
                height: boundingRect.height + 'px',
                top: boundingRect.top + 'px',
                left: boundingRect.left + 'px',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
                zIndex: '100',
                borderRadius: borderRadius
            };
            try {
                for (var _b = __values(Object.keys(styles)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name = _c.value;
                    this.renderer.setStyle(this._backdropElement, name, styles[name]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        return TourBackdropService;
    }());
    TourBackdropService.decorators = [
        { type: i0.Injectable }
    ];
    TourBackdropService.ctorParameters = function () { return [
        { type: i0.RendererFactory2 }
    ]; };

    var TourAnchorNgBootstrapPopoverDirective = /** @class */ (function (_super) {
        __extends(TourAnchorNgBootstrapPopoverDirective, _super);
        function TourAnchorNgBootstrapPopoverDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TourAnchorNgBootstrapPopoverDirective;
    }(ngBootstrap.NgbPopover));
    TourAnchorNgBootstrapPopoverDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[tourAnchor]' },] }
    ];
    var TourAnchorNgBootstrapDirective = /** @class */ (function () {
        /* private get tourWindow(): HTMLElement {
          return this.document.getElementsByClassName(this.tourWindowClass).item(0) as HTMLElement;
        } */
        function TourAnchorNgBootstrapDirective(element, scrollService, tourService, tourStepTemplate, tourBackdrop, popover) {
            this.element = element;
            this.scrollService = scrollService;
            this.tourService = tourService;
            this.tourStepTemplate = tourStepTemplate;
            this.tourBackdrop = tourBackdrop;
            this.popover = popover;
            this.tourWindowClass = 'ngx-tour-window';
            this.click = new i0.EventEmitter();
            this.popover.autoClose = false;
            this.popover.triggers = '';
            this.popover.popoverClass = this.tourWindowClass;
            this.popover.toggle = function () { };
        }
        TourAnchorNgBootstrapDirective.prototype.ngAfterViewInit = function () {
            this.tourService.register(this.tourAnchor, this);
        };
        TourAnchorNgBootstrapDirective.prototype.ngOnDestroy = function () {
            this.tourService.unregister(this.tourAnchor);
            this.click.complete();
        };
        TourAnchorNgBootstrapDirective.prototype.showTourStep = function (step) {
            this.step = step;
            this.isActive = true;
            this.popover.ngbPopover = this.tourStepTemplate.template;
            this.popover.popoverTitle = step.title;
            this.popover.container = 'body';
            this.popover.placement = step.placement || 'auto';
            step.prevBtnTitle = step.prevBtnTitle || 'Prev';
            step.nextBtnTitle = step.nextBtnTitle || 'Next';
            step.endBtnTitle = step.endBtnTitle || 'End';
            this.openTourWindow();
            this.setBackdrop();
        };
        TourAnchorNgBootstrapDirective.prototype.hideTourStep = function () {
            this.step = null;
            this.isActive = false;
            this.popover.close();
            if (this.tourService.getStatus() === ngxTourCore.TourState.OFF) {
                this.tourBackdrop.close();
            }
        };
        /** Open the tour window with ngb-popover */
        TourAnchorNgBootstrapDirective.prototype.openTourWindow = function () {
            var _this = this;
            // Scroll the tour window into view after ngbPopover is opened
            this.popover.shown.pipe(operators.takeUntil(this.tourService.stepHide$)).subscribe(function () {
                if (!_this.step.preventScrolling) {
                    _this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                }
            });
            if (this.popover.isOpen()) {
                this.popover.hidden.pipe(operators.take(1), operators.tap(function () { return _this.popover.open({ step: _this.step }); })).subscribe();
            }
            else {
                this.popover.open({ step: this.step });
            }
        };
        /** Set a backdrop that highlights the tour anchor element or a custom input element */
        TourAnchorNgBootstrapDirective.prototype.setBackdrop = function () {
            var _this = this;
            var targetElement = this.focusedElement || this.element;
            if (this.step.enableBackdrop) {
                this.tourBackdrop.show(targetElement);
                // Adjust the backdrop position on scroll
                this.scrollService.ancestorScrolled(this.element, 0).pipe(operators.takeUntil(this.tourService.stepHide$), operators.tap(function () { return _this.tourBackdrop.show(targetElement); })).subscribe();
                if (this.click.observers.length) {
                    this.tourBackdrop.backdropElement.classList.add('clickable');
                }
                rxjs.fromEvent(this.tourBackdrop.backdropElement, 'click').pipe(operators.tap(function () { return _this.click.next(); })).subscribe();
            }
            else {
                this.tourBackdrop.close();
            }
        };
        return TourAnchorNgBootstrapDirective;
    }());
    TourAnchorNgBootstrapDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[tourAnchor]',
                },] }
    ];
    TourAnchorNgBootstrapDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: scrolling.ScrollDispatcher },
        { type: NgbTourService },
        { type: TourStepTemplateService },
        { type: TourBackdropService },
        { type: TourAnchorNgBootstrapPopoverDirective, decorators: [{ type: i0.Host }] }
    ]; };
    TourAnchorNgBootstrapDirective.propDecorators = {
        tourAnchor: [{ type: i0.Input }],
        focusedElement: [{ type: i0.Input }],
        click: [{ type: i0.Output, args: ['tourAnchorClick',] }],
        isActive: [{ type: i0.HostBinding, args: ['class.touranchor--is-active',] }]
    };

    var TourStepTemplateComponent = /** @class */ (function (_super) {
        __extends(TourStepTemplateComponent, _super);
        function TourStepTemplateComponent(tourStepTemplateService, tourService) {
            var _this = _super.call(this, tourService) || this;
            _this.tourStepTemplateService = tourStepTemplateService;
            _this.tourService = tourService;
            return _this;
        }
        TourStepTemplateComponent.prototype.ngAfterContentInit = function () {
            this.tourStepTemplateService.template =
                this.stepTemplate ||
                    this.stepTemplateContent ||
                    this.defaultTourStepTemplate;
        };
        return TourStepTemplateComponent;
    }(ngxTourCore.TourHotkeyListenerComponent));
    TourStepTemplateComponent.decorators = [
        { type: i0.Component, args: [{
                    encapsulation: i0.ViewEncapsulation.None,
                    selector: 'tour-step-template',
                    template: "\n    <ng-template #tourStep let-step=\"step\">\n      <p class=\"tour-step-content\">{{ step?.content }}</p>\n      <div class=\"tour-step-navigation\">\n        <button\n          *ngIf=\"tourService.hasPrev(step)\"\n          class=\"btn btn-sm btn-default\"\n          (click)=\"tourService.prev()\"\n        >\n          \u00AB {{ step?.prevBtnTitle }}\n        </button>\n        <button\n          *ngIf=\"tourService.hasNext(step)\"\n          class=\"btn btn-sm btn-default\"\n          (click)=\"tourService.next()\"\n        >\n          {{ step?.nextBtnTitle }} \u00BB\n        </button>\n        <button class=\"btn btn-sm btn-default\" (click)=\"tourService.end()\">\n          {{ step?.endBtnTitle }}\n        </button>\n      </div>\n    </ng-template>\n  "
                },] }
    ];
    TourStepTemplateComponent.ctorParameters = function () { return [
        { type: TourStepTemplateService },
        { type: NgbTourService }
    ]; };
    TourStepTemplateComponent.propDecorators = {
        defaultTourStepTemplate: [{ type: i0.ViewChild, args: ['tourStep', { read: i0.TemplateRef, static: true },] }],
        stepTemplate: [{ type: i0.Input }],
        stepTemplateContent: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }]
    };

    var TourNgBootstrapModule = /** @class */ (function () {
        function TourNgBootstrapModule() {
        }
        TourNgBootstrapModule.forRoot = function () {
            return {
                ngModule: TourNgBootstrapModule,
                providers: [
                    TourStepTemplateService,
                    TourBackdropService,
                    ngxTourCore.TourService,
                    NgbTourService
                ],
            };
        };
        return TourNgBootstrapModule;
    }());
    TourNgBootstrapModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective, TourStepTemplateComponent],
                    exports: [TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective, TourStepTemplateComponent],
                    imports: [common.CommonModule, ngBootstrap.NgbPopoverModule, scrolling.ScrollingModule],
                },] }
    ];

    /*
     * Public API Surface of ngx-tour-ng-bootstrap
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TourAnchorNgBootstrapDirective = TourAnchorNgBootstrapDirective;
    exports.TourNgBootstrapModule = TourNgBootstrapModule;
    exports.TourService = NgbTourService;
    exports.TourStepTemplateComponent = TourStepTemplateComponent;
    exports.ɵa = NgbTourService;
    exports.ɵb = TourAnchorNgBootstrapPopoverDirective;
    exports.ɵc = TourStepTemplateService;
    exports.ɵd = TourBackdropService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-tour-ng-bootstrap.umd.js.map
