import { ɵɵdefineInjectable, ɵɵinject, Injectable, RendererFactory2, Directive, ElementRef, Host, Inject, Input, HostBinding, Component, ViewEncapsulation, ViewChild, TemplateRef, ContentChild, NgModule } from '@angular/core';
import { TourService, TourState, TourHotkeyListenerComponent } from 'ngx-tour-core';
import { Router } from '@angular/router';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

class NgbTourService extends TourService {
}
NgbTourService.ɵprov = ɵɵdefineInjectable({ factory: function NgbTourService_Factory() { return new NgbTourService(ɵɵinject(Router)); }, token: NgbTourService, providedIn: "root" });
NgbTourService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class TourStepTemplateService {
}
TourStepTemplateService.decorators = [
    { type: Injectable }
];

class TourBackdropService {
    constructor(rendererFactory) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    show(targetElement) {
        const boundingRect = targetElement.nativeElement.getBoundingClientRect();
        if (!this.backdropElement) {
            this.backdropElement = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropElement, 'ngx-tour_backdrop');
            this.renderer.appendChild(document.body, this.backdropElement);
        }
        this.setStyles(boundingRect, targetElement.nativeElement);
    }
    close() {
        if (this.backdropElement) {
            this.renderer.removeChild(document.body, this.backdropElement);
            this.backdropElement = null;
        }
    }
    setStyles(boundingRect, targetElement) {
        const borderRadius = getComputedStyle(targetElement).borderRadius;
        const styles = {
            position: 'fixed',
            width: boundingRect.width + 'px',
            height: boundingRect.height + 'px',
            top: boundingRect.top + 'px',
            left: boundingRect.left + 'px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
            zIndex: '100',
            borderRadius: borderRadius
        };
        for (const name of Object.keys(styles)) {
            this.renderer.setStyle(this.backdropElement, name, styles[name]);
        }
    }
}
TourBackdropService.decorators = [
    { type: Injectable }
];
TourBackdropService.ctorParameters = () => [
    { type: RendererFactory2 }
];

class TourAnchorNgBootstrapPopoverDirective extends NgbPopover {
}
TourAnchorNgBootstrapPopoverDirective.decorators = [
    { type: Directive, args: [{ selector: '[tourAnchor]' },] }
];
class TourAnchorNgBootstrapDirective {
    constructor(element, tourService, tourStepTemplate, tourBackdrop, popoverDirective, doc) {
        this.element = element;
        this.tourService = tourService;
        this.tourStepTemplate = tourStepTemplate;
        this.tourBackdrop = tourBackdrop;
        this.popoverDirective = popoverDirective;
        this.doc = doc;
        this.tourWindowClass = 'ngx-tour-window';
        this.document = doc;
        this.popoverDirective.autoClose = false;
        this.popoverDirective.triggers = '';
        this.popoverDirective.popoverClass = this.tourWindowClass;
        this.popoverDirective.toggle = () => { };
    }
    get tourWindow() {
        return this.document.getElementsByClassName(this.tourWindowClass).item(0);
    }
    ngOnInit() {
        this.tourService.register(this.tourAnchor, this);
    }
    ngOnDestroy() {
        this.tourService.unregister(this.tourAnchor);
    }
    showTourStep(step) {
        this.isActive = true;
        this.popoverDirective.ngbPopover = this.tourStepTemplate.template;
        this.popoverDirective.popoverTitle = step.title;
        this.popoverDirective.container = 'body';
        this.popoverDirective.placement = (step.placement || 'top')
            .replace('before', 'left').replace('after', 'right')
            .replace('below', 'bottom').replace('above', 'top');
        step.prevBtnTitle = step.prevBtnTitle || 'Prev';
        step.nextBtnTitle = step.nextBtnTitle || 'Next';
        step.endBtnTitle = step.endBtnTitle || 'End';
        // Scroll the tour window into view after ngbPopover is opened
        this.popoverDirective.shown.subscribe(() => {
            if (!step.preventScrolling) {
                console.log('scrolling into view', this.tourWindow);
                this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        // Open the tour window
        this.popoverDirective.open({ step });
        // Set a backdrop that highlights the tour anchor element or a custom input element
        if (step.enableBackdrop) {
            this.tourBackdrop.show(this.element);
            // Adjust the backdrop position on scroll
            fromEvent(window, 'scroll').pipe(takeUntil(this.tourService.stepHide$), tap(() => {
                this.tourBackdrop.close();
                this.tourBackdrop.show(this.element);
            })).subscribe();
        }
        else {
            this.tourBackdrop.close();
        }
    }
    hideTourStep() {
        this.isActive = false;
        this.popoverDirective.close();
        if (this.tourService.getStatus() === TourState.OFF) {
            this.tourBackdrop.close();
        }
    }
}
TourAnchorNgBootstrapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tourAnchor]',
            },] }
];
TourAnchorNgBootstrapDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgbTourService },
    { type: TourStepTemplateService },
    { type: TourBackdropService },
    { type: TourAnchorNgBootstrapPopoverDirective, decorators: [{ type: Host }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
TourAnchorNgBootstrapDirective.propDecorators = {
    tourAnchor: [{ type: Input }],
    isActive: [{ type: HostBinding, args: ['class.touranchor--is-active',] }]
};

class TourStepTemplateComponent extends TourHotkeyListenerComponent {
    constructor(tourStepTemplateService, tourService) {
        super(tourService);
        this.tourStepTemplateService = tourStepTemplateService;
        this.tourService = tourService;
    }
    ngAfterContentInit() {
        this.tourStepTemplateService.template =
            this.stepTemplate ||
                this.stepTemplateContent ||
                this.defaultTourStepTemplate;
    }
}
TourStepTemplateComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'tour-step-template',
                template: `
    <ng-template #tourStep let-step="step">
      <p class="tour-step-content">{{ step?.content }}</p>
      <div class="tour-step-navigation">
        <button
          *ngIf="tourService.hasPrev(step)"
          class="btn btn-sm btn-default"
          (click)="tourService.prev()"
        >
          « {{ step?.prevBtnTitle }}
        </button>
        <button
          *ngIf="tourService.hasNext(step)"
          class="btn btn-sm btn-default"
          (click)="tourService.next()"
        >
          {{ step?.nextBtnTitle }} »
        </button>
        <button class="btn btn-sm btn-default" (click)="tourService.end()">
          {{ step?.endBtnTitle }}
        </button>
      </div>
    </ng-template>
  `
            },] }
];
TourStepTemplateComponent.ctorParameters = () => [
    { type: TourStepTemplateService },
    { type: NgbTourService }
];
TourStepTemplateComponent.propDecorators = {
    defaultTourStepTemplate: [{ type: ViewChild, args: ['tourStep', { read: TemplateRef, static: true },] }],
    stepTemplate: [{ type: Input }],
    stepTemplateContent: [{ type: ContentChild, args: [TemplateRef,] }]
};

class TourNgBootstrapModule {
    static forRoot() {
        return {
            ngModule: TourNgBootstrapModule,
            providers: [
                TourStepTemplateService,
                TourBackdropService,
                TourService,
                NgbTourService
            ],
        };
    }
}
TourNgBootstrapModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective, TourStepTemplateComponent],
                exports: [TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective, TourStepTemplateComponent],
                imports: [CommonModule, NgbPopoverModule],
            },] }
];

/*
 * Public API Surface of ngx-tour-ng-bootstrap
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TourAnchorNgBootstrapDirective, TourNgBootstrapModule, NgbTourService as TourService, TourStepTemplateComponent, NgbTourService as ɵa, TourAnchorNgBootstrapPopoverDirective as ɵb, TourStepTemplateService as ɵc, TourBackdropService as ɵd };
//# sourceMappingURL=ngx-tour-ng-bootstrap.js.map
