import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, merge as mergeStatic } from 'rxjs';
import { first, map, filter, take, takeUntil } from 'rxjs/operators';
export var TourState;
(function (TourState) {
    TourState[TourState["OFF"] = 0] = "OFF";
    TourState[TourState["ON"] = 1] = "ON";
    TourState[TourState["PAUSED"] = 2] = "PAUSED";
})(TourState || (TourState = {}));
export class TourService {
    constructor(router) {
        this.router = router;
        this.stepShow$ = new Subject();
        this.stepHide$ = new Subject();
        this.initialize$ = new Subject();
        this.start$ = new Subject();
        this.end$ = new Subject();
        this.pause$ = new Subject();
        this.resume$ = new Subject();
        this.anchorRegister$ = new Subject();
        this.anchorUnregister$ = new Subject();
        this.events$ = mergeStatic(this.stepShow$.pipe(map(value => ({ name: 'stepShow', value }))), this.stepHide$.pipe(map(value => ({ name: 'stepHide', value }))), this.initialize$.pipe(map(value => ({ name: 'initialize', value }))), this.start$.pipe(map(value => ({ name: 'start', value }))), this.end$.pipe(map(value => ({ name: 'end', value }))), this.pause$.pipe(map(value => ({ name: 'pause', value }))), this.resume$.pipe(map(value => ({ name: 'resume', value }))), this.anchorRegister$.pipe(map(value => ({
            name: 'anchorRegister',
            value
        }))), this.anchorUnregister$.pipe(map(value => ({
            name: 'anchorUnregister',
            value
        }))));
        this.steps = [];
        this.anchors = {};
        this.status = TourState.OFF;
        this.isHotKeysEnabled = true;
    }
    initialize(steps, stepDefaults) {
        if (steps && steps.length > 0) {
            this.status = TourState.OFF;
            this.steps = steps.map(step => Object.assign({}, stepDefaults, step));
            this.initialize$.next(this.steps);
        }
    }
    disableHotkeys() {
        this.isHotKeysEnabled = false;
    }
    enableHotkeys() {
        this.isHotKeysEnabled = true;
    }
    start() {
        this.startAt(0);
    }
    startAt(stepId) {
        this.status = TourState.ON;
        this.goToStep(this.loadStep(stepId));
        this.start$.next();
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart), first())
            .subscribe(() => {
            if (this.currentStep && this.currentStep.hasOwnProperty('route')) {
                this.hideStep(this.currentStep);
            }
        });
    }
    end() {
        this.status = TourState.OFF;
        this.hideStep(this.currentStep);
        this.currentStep = undefined;
        this.end$.next();
    }
    pause() {
        this.status = TourState.PAUSED;
        this.hideStep(this.currentStep);
        this.pause$.next();
    }
    resume() {
        this.status = TourState.ON;
        this.showStep(this.currentStep);
        this.resume$.next();
    }
    toggle(pause) {
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
    }
    next() {
        if (this.hasNext(this.currentStep)) {
            this.goToStep(this.loadStep(this.currentStep.nextStep || this.steps.indexOf(this.currentStep) + 1));
        }
    }
    hasNext(step) {
        if (!step) {
            console.warn('Can\'t get next step. No currentStep.');
            return false;
        }
        return (step.nextStep !== undefined ||
            this.steps.indexOf(step) < this.steps.length - 1);
    }
    prev() {
        if (this.hasPrev(this.currentStep)) {
            this.goToStep(this.loadStep(this.currentStep.prevStep || this.steps.indexOf(this.currentStep) - 1));
        }
    }
    hasPrev(step) {
        if (!step) {
            console.warn('Can\'t get previous step. No currentStep.');
            return false;
        }
        return step.prevStep !== undefined || this.steps.indexOf(step) > 0;
    }
    goto(stepId) {
        this.goToStep(this.loadStep(stepId));
    }
    register(anchorId, anchor) {
        if (!anchorId) {
            return;
        }
        if (this.anchors[anchorId]) {
            throw new Error('anchorId ' + anchorId + ' already registered!');
        }
        this.anchors[anchorId] = anchor;
        this.anchorRegister$.next(anchorId);
    }
    unregister(anchorId) {
        if (!anchorId) {
            return;
        }
        delete this.anchors[anchorId];
        this.anchorUnregister$.next(anchorId);
    }
    getStatus() {
        return this.status;
    }
    isHotkeysEnabled() {
        return this.isHotKeysEnabled;
    }
    goToStep(step) {
        if (!step) {
            console.warn('Can\'t go to non-existent step');
            this.end();
            return;
        }
        let navigatePromise = new Promise(resolve => resolve(true));
        if (step.route !== undefined && typeof step.route === 'string') {
            navigatePromise = this.router.navigateByUrl(step.route);
        }
        else if (step.route && Array.isArray(step.route)) {
            navigatePromise = this.router.navigate(step.route);
        }
        navigatePromise.then(navigated => {
            if (navigated !== false) {
                setTimeout(() => this.setCurrentStep(step));
            }
        });
    }
    loadStep(stepId) {
        if (typeof stepId === 'number') {
            return this.steps[stepId];
        }
        else {
            return this.steps.find(step => step.stepId === stepId);
        }
    }
    setCurrentStep(step) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentStep) {
                this.hideStep(this.currentStep);
            }
            this.currentStep = step;
            yield this.showStep(this.currentStep);
            this.router.events
                .pipe(filter(event => event instanceof NavigationStart), first())
                .subscribe(() => {
                if (this.currentStep && this.currentStep.hasOwnProperty('route')) {
                    this.hideStep(this.currentStep);
                }
            });
        });
    }
    showStep(step) {
        return __awaiter(this, void 0, void 0, function* () {
            let anchor = this.anchors[step && step.anchorId];
            if (anchor) {
                // Anchor is registered, continue tour
                anchor.showTourStep(step);
                this.stepShow$.next(step);
            }
            else {
                console.warn('Can\'t attach to unregistered anchor with id ' + step.anchorId);
                // Wait for anchor to register itself and continue
                anchor = yield this.anchorRegister$.pipe(filter(anchorId => anchorId === step.anchorId), map(anchorId => this.anchors[anchorId]), takeUntil(this.end$), take(1)).toPromise();
                if (anchor) {
                    anchor.showTourStep(step);
                    this.stepShow$.next(step);
                }
            }
        });
    }
    hideStep(step) {
        const anchor = this.anchors[step && step.anchorId];
        if (!anchor) {
            return;
        }
        anchor.hideTourStep();
        this.stepHide$.next(step);
    }
}
TourService.decorators = [
    { type: Injectable }
];
TourService.ctorParameters = () => [
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L3NvdXJjZS9yZXBvcy9uZ3gtdG91ci9wcm9qZWN0cy9uZ3gtdG91ci1jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90b3VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl4RCxPQUFPLEVBQUUsT0FBTyxFQUFjLEtBQUssSUFBSSxXQUFXLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWlCckUsTUFBTSxDQUFOLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQix1Q0FBRyxDQUFBO0lBQ0gscUNBQUUsQ0FBQTtJQUNGLDZDQUFNLENBQUE7QUFDUixDQUFDLEVBSlcsU0FBUyxLQUFULFNBQVMsUUFJcEI7QUFHRCxNQUFNLE9BQU8sV0FBVztJQXVDdEIsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF0QzNCLGNBQVMsR0FBZSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3RDLGNBQVMsR0FBZSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3RDLGdCQUFXLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUMsV0FBTSxHQUFlLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbkMsU0FBSSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBZSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25DLFlBQU8sR0FBZSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3BDLG9CQUFlLEdBQW9CLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakQsc0JBQWlCLEdBQW9CLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbkQsWUFBTyxHQUE2QyxXQUFXLENBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUM1RCxJ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O2dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLCtDQUErQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDOUUsa0RBQWtEO2dCQUNsRCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDdEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDOUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUNwQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFZCxJQUFJLE1BQU0sRUFBRTtvQkFDVixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDM0I7YUFDRjtRQUNILENBQUM7S0FBQTtJQUVPLFFBQVEsQ0FBQyxJQUFPO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7OztZQTlQRixVQUFVOzs7WUE1QmMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF2aWdhdGlvblN0YXJ0LCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgdHlwZSB7VXJsU2VnbWVudH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgVG91ckFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4vdG91ci1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIG1lcmdlIGFzIG1lcmdlU3RhdGljIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCwgbWFwLCBmaWx0ZXIsIHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3RlcE9wdGlvbiB7XG4gIHN0ZXBJZD86IHN0cmluZztcbiAgYW5jaG9ySWQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBjb250ZW50Pzogc3RyaW5nO1xuICByb3V0ZT86IHN0cmluZyB8IFVybFNlZ21lbnRbXTtcbiAgbmV4dFN0ZXA/OiBudW1iZXIgfCBzdHJpbmc7XG4gIHByZXZTdGVwPzogbnVtYmVyIHwgc3RyaW5nO1xuICBwbGFjZW1lbnQ/OiBhbnk7XG4gIHByZXZlbnRTY3JvbGxpbmc/OiBib29sZWFuO1xuICBwcmV2QnRuVGl0bGU/OiBzdHJpbmc7XG4gIG5leHRCdG5UaXRsZT86IHN0cmluZztcbiAgZW5kQnRuVGl0bGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFRvdXJTdGF0ZSB7XG4gIE9GRixcbiAgT04sXG4gIFBBVVNFRFxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG91clNlcnZpY2U8VCBleHRlbmRzIElTdGVwT3B0aW9uID0gSVN0ZXBPcHRpb24+IHtcbiAgcHVibGljIHN0ZXBTaG93JDogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBzdGVwSGlkZSQ6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgaW5pdGlhbGl6ZSQ6IFN1YmplY3Q8VFtdPiA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBzdGFydCQ6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgZW5kJDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIHBhdXNlJDogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyByZXN1bWUkOiBTdWJqZWN0PFQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGFuY2hvclJlZ2lzdGVyJDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGFuY2hvclVucmVnaXN0ZXIkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgZXZlbnRzJDogT2JzZXJ2YWJsZTx7IG5hbWU6IHN0cmluZzsgdmFsdWU6IGFueSB9PiA9IG1lcmdlU3RhdGljKFxuICAgIHRoaXMuc3RlcFNob3ckLnBpcGUobWFwKHZhbHVlID0+ICh7IG5hbWU6ICdzdGVwU2hvdycsIHZhbHVlIH0pKSksXG4gICAgdGhpcy5zdGVwSGlkZSQucGlwZShtYXAodmFsdWUgPT4gKHsgbmFtZTogJ3N0ZXBIaWRlJywgdmFsdWUgfSkpKSxcbiAgICB0aGlzLmluaXRpYWxpemUkLnBpcGUobWFwKHZhbHVlID0+ICh7IG5hbWU6ICdpbml0aWFsaXplJywgdmFsdWUgfSkpKSxcbiAgICB0aGlzLnN0YXJ0JC5waXBlKG1hcCh2YWx1ZSA9PiAoeyBuYW1lOiAnc3RhcnQnLCB2YWx1ZSB9KSkpLFxuICAgIHRoaXMuZW5kJC5waXBlKG1hcCh2YWx1ZSA9PiAoeyBuYW1lOiAnZW5kJywgdmFsdWUgfSkpKSxcbiAgICB0aGlzLnBhdXNlJC5waXBlKG1hcCh2YWx1ZSA9PiAoeyBuYW1lOiAncGF1c2UnLCB2YWx1ZSB9KSkpLFxuICAgIHRoaXMucmVzdW1lJC5waXBlKG1hcCh2YWx1ZSA9PiAoeyBuYW1lOiAncmVzdW1lJywgdmFsdWUgfSkpKSxcbiAgICB0aGlzLmFuY2hvclJlZ2lzdGVyJC5waXBlKFxuICAgICAgbWFwKHZhbHVlID0+ICh7XG4gICAgICAgIG5hbWU6ICdhbmNob3JSZWdpc3RlcicsXG4gICAgICAgIHZhbHVlXG4gICAgICB9KSlcbiAgICApLFxuICAgIHRoaXMuYW5jaG9yVW5yZWdpc3RlciQucGlwZShcbiAgICAgIG1hcCh2YWx1ZSA9PiAoe1xuICAgICAgICBuYW1lOiAnYW5jaG9yVW5yZWdpc3RlcicsXG4gICAgICAgIHZhbHVlXG4gICAgICB9KSlcbiAgICApXG4gICk7XG5cbiAgcHVibGljIHN0ZXBzOiBUW10gPSBbXTtcbiAgcHVibGljIGN1cnJlbnRTdGVwOiBUO1xuXG4gIHB1YmxpYyBhbmNob3JzOiB7IFthbmNob3JJZDogc3RyaW5nXTogVG91ckFuY2hvckRpcmVjdGl2ZSB9ID0ge307XG4gIHByaXZhdGUgc3RhdHVzOiBUb3VyU3RhdGUgPSBUb3VyU3RhdGUuT0ZGO1xuICBwcml2YXRlIGlzSG90S2V5c0VuYWJsZWQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgcHVibGljIGluaXRpYWxpemUoc3RlcHM6IFRbXSwgc3RlcERlZmF1bHRzPzogVCk6IHZvaWQge1xuICAgIGlmIChzdGVwcyAmJiBzdGVwcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IFRvdXJTdGF0ZS5PRkY7XG4gICAgICB0aGlzLnN0ZXBzID0gc3RlcHMubWFwKHN0ZXAgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RlcERlZmF1bHRzLCBzdGVwKSk7XG4gICAgICB0aGlzLmluaXRpYWxpemUkLm5leHQodGhpcy5zdGVwcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc2FibGVIb3RrZXlzKCk6IHZvaWQge1xuICAgIHRoaXMuaXNIb3RLZXlzRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGVuYWJsZUhvdGtleXMoKTogdm9pZCB7XG4gICAgdGhpcy5pc0hvdEtleXNFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0QXQoMCk7XG4gIH1cblxuICBwdWJsaWMgc3RhcnRBdChzdGVwSWQ6IG51bWJlciB8IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RhdHVzID0gVG91clN0YXRlLk9OO1xuICAgIHRoaXMuZ29Ub1N0ZXAodGhpcy5sb2FkU3RlcChzdGVwSWQpKTtcbiAgICB0aGlzLnN0YXJ0JC5uZXh0KCk7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpLCBmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwICYmIHRoaXMuY3VycmVudFN0ZXAuaGFzT3duUHJvcGVydHkoJ3JvdXRlJykpIHtcbiAgICAgICAgICB0aGlzLmhpZGVTdGVwKHRoaXMuY3VycmVudFN0ZXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBlbmQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0dXMgPSBUb3VyU3RhdGUuT0ZGO1xuICAgIHRoaXMuaGlkZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmVuZCQubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIHBhdXNlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdHVzID0gVG91clN0YXRlLlBBVVNFRDtcbiAgICB0aGlzLmhpZGVTdGVwKHRoaXMuY3VycmVudFN0ZXApO1xuICAgIHRoaXMucGF1c2UkLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZXN1bWUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0dXMgPSBUb3VyU3RhdGUuT047XG4gICAgdGhpcy5zaG93U3RlcCh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgICB0aGlzLnJlc3VtZSQubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZShwYXVzZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAocGF1c2UpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzdW1lKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwKSB7XG4gICAgICAgIHRoaXMuZW5kKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGFzTmV4dCh0aGlzLmN1cnJlbnRTdGVwKSkge1xuICAgICAgdGhpcy5nb1RvU3RlcChcbiAgICAgICAgdGhpcy5sb2FkU3RlcChcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGVwLm5leHRTdGVwIHx8IHRoaXMuc3RlcHMuaW5kZXhPZih0aGlzLmN1cnJlbnRTdGVwKSArIDFcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFzTmV4dChzdGVwOiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKCFzdGVwKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZ2V0IG5leHQgc3RlcC4gTm8gY3VycmVudFN0ZXAuJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBzdGVwLm5leHRTdGVwICE9PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuc3RlcHMuaW5kZXhPZihzdGVwKSA8IHRoaXMuc3RlcHMubGVuZ3RoIC0gMVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oYXNQcmV2KHRoaXMuY3VycmVudFN0ZXApKSB7XG4gICAgICB0aGlzLmdvVG9TdGVwKFxuICAgICAgICB0aGlzLmxvYWRTdGVwKFxuICAgICAgICAgIHRoaXMuY3VycmVudFN0ZXAucHJldlN0ZXAgfHwgdGhpcy5zdGVwcy5pbmRleE9mKHRoaXMuY3VycmVudFN0ZXApIC0gMVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYXNQcmV2KHN0ZXA6IFQpOiBib29sZWFuIHtcbiAgICBpZiAoIXN0ZXApIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBnZXQgcHJldmlvdXMgc3RlcC4gTm8gY3VycmVudFN0ZXAuJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzdGVwLnByZXZTdGVwICE9PSB1bmRlZmluZWQgfHwgdGhpcy5zdGVwcy5pbmRleE9mKHN0ZXApID4gMDtcbiAgfVxuXG4gIHB1YmxpYyBnb3RvKHN0ZXBJZDogbnVtYmVyIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvU3RlcCh0aGlzLmxvYWRTdGVwKHN0ZXBJZCkpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyKGFuY2hvcklkOiBzdHJpbmcsIGFuY2hvcjogVG91ckFuY2hvckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGlmICghYW5jaG9ySWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYW5jaG9yc1thbmNob3JJZF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYW5jaG9ySWQgJyArIGFuY2hvcklkICsgJyBhbHJlYWR5IHJlZ2lzdGVyZWQhJyk7XG4gICAgfVxuICAgIHRoaXMuYW5jaG9yc1thbmNob3JJZF0gPSBhbmNob3I7XG4gICAgdGhpcy5hbmNob3JSZWdpc3RlciQubmV4dChhbmNob3JJZCk7XG4gIH1cblxuICBwdWJsaWMgdW5yZWdpc3RlcihhbmNob3JJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFhbmNob3JJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5hbmNob3JzW2FuY2hvcklkXTtcbiAgICB0aGlzLmFuY2hvclVucmVnaXN0ZXIkLm5leHQoYW5jaG9ySWQpO1xuICB9XG5cbiAgcHVibGljIGdldFN0YXR1cygpOiBUb3VyU3RhdGUge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cztcbiAgfVxuXG4gIHB1YmxpYyBpc0hvdGtleXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSG90S2V5c0VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIGdvVG9TdGVwKHN0ZXA6IFQpOiB2b2lkIHtcbiAgICBpZiAoIXN0ZXApIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBnbyB0byBub24tZXhpc3RlbnQgc3RlcCcpO1xuICAgICAgdGhpcy5lbmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IG5hdmlnYXRlUHJvbWlzZTogUHJvbWlzZTxib29sZWFuPiA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICApO1xuICAgIGlmIChzdGVwLnJvdXRlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHN0ZXAucm91dGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuYXZpZ2F0ZVByb21pc2UgPSB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHN0ZXAucm91dGUpO1xuICAgIH0gZWxzZSBpZiAoc3RlcC5yb3V0ZSAmJiBBcnJheS5pc0FycmF5KHN0ZXAucm91dGUpKSB7XG4gICAgICBuYXZpZ2F0ZVByb21pc2UgPSB0aGlzLnJvdXRlci5uYXZpZ2F0ZShzdGVwLnJvdXRlKTtcbiAgICB9XG4gICAgbmF2aWdhdGVQcm9taXNlLnRoZW4obmF2aWdhdGVkID0+IHtcbiAgICAgIGlmIChuYXZpZ2F0ZWQgIT09IGZhbHNlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRDdXJyZW50U3RlcChzdGVwKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTdGVwKHN0ZXBJZDogbnVtYmVyIHwgc3RyaW5nKTogVCB7XG4gICAgaWYgKHR5cGVvZiBzdGVwSWQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGVwc1tzdGVwSWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGVwcy5maW5kKHN0ZXAgPT4gc3RlcC5zdGVwSWQgPT09IHN0ZXBJZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzZXRDdXJyZW50U3RlcChzdGVwOiBUKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0ZXApIHtcbiAgICAgIHRoaXMuaGlkZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFN0ZXAgPSBzdGVwO1xuICAgIGF3YWl0IHRoaXMuc2hvd1N0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpLCBmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwICYmIHRoaXMuY3VycmVudFN0ZXAuaGFzT3duUHJvcGVydHkoJ3JvdXRlJykpIHtcbiAgICAgICAgICB0aGlzLmhpZGVTdGVwKHRoaXMuY3VycmVudFN0ZXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2hvd1N0ZXAoc3RlcDogVCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBhbmNob3IgPSB0aGlzLmFuY2hvcnNbc3RlcCAmJiBzdGVwLmFuY2hvcklkXTtcbiAgICBpZiAoYW5jaG9yKSB7XG4gICAgICAvLyBBbmNob3IgaXMgcmVnaXN0ZXJlZCwgY29udGludWUgdG91clxuICAgICAgYW5jaG9yLnNob3dUb3VyU3RlcChzdGVwKTtcbiAgICAgIHRoaXMuc3RlcFNob3ckLm5leHQoc3RlcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBhdHRhY2ggdG8gdW5yZWdpc3RlcmVkIGFuY2hvciB3aXRoIGlkICcgKyBzdGVwLmFuY2hvcklkKTtcbiAgICAgIC8vIFdhaXQgZm9yIGFuY2hvciB0byByZWdpc3RlciBpdHNlbGYgYW5kIGNvbnRpbnVlXG4gICAgICBhbmNob3IgPSBhd2FpdCB0aGlzLmFuY2hvclJlZ2lzdGVyJC5waXBlKFxuICAgICAgICBmaWx0ZXIoYW5jaG9ySWQgPT4gYW5jaG9ySWQgPT09IHN0ZXAuYW5jaG9ySWQpLFxuICAgICAgICBtYXAoYW5jaG9ySWQgPT4gdGhpcy5hbmNob3JzW2FuY2hvcklkXSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmVuZCQpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApLnRvUHJvbWlzZSgpO1xuXG4gICAgICBpZiAoYW5jaG9yKSB7XG4gICAgICAgIGFuY2hvci5zaG93VG91clN0ZXAoc3RlcCk7XG4gICAgICAgIHRoaXMuc3RlcFNob3ckLm5leHQoc3RlcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlU3RlcChzdGVwOiBUKTogdm9pZCB7XG4gICAgY29uc3QgYW5jaG9yID0gdGhpcy5hbmNob3JzW3N0ZXAgJiYgc3RlcC5hbmNob3JJZF07XG4gICAgaWYgKCFhbmNob3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYW5jaG9yLmhpZGVUb3VyU3RlcCgpO1xuICAgIHRoaXMuc3RlcEhpZGUkLm5leHQoc3RlcCk7XG4gIH1cbn1cbiJdfQ==