import * as i0 from '@angular/core';
import { Injectable, RendererFactory2, Directive, EventEmitter, ElementRef, Host, Input, Output, HostBinding, Component, ViewEncapsulation, ViewChild, TemplateRef, ContentChild, NgModule } from '@angular/core';
import { TourService, TourState, TourHotkeyListenerComponent } from 'ngx-tour-core';
import * as i1 from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { fromEvent } from 'rxjs';
import { takeUntil, take, tap } from 'rxjs/operators';

class NgbTourService extends TourService {
}
NgbTourService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTourService_Factory() { return new NgbTourService(i0.ɵɵinject(i1.Router)); }, token: NgbTourService, providedIn: "root" });
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
    get backdropElement() {
        return this._backdropElement;
    }
    show(targetElement) {
        const boundingRect = targetElement.nativeElement.getBoundingClientRect();
        if (!this._backdropElement) {
            this._backdropElement = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropElement, 'ngx-tour_backdrop');
            this.renderer.appendChild(document.body, this.backdropElement);
        }
        this.setStyles(boundingRect, targetElement.nativeElement);
    }
    close() {
        if (this._backdropElement) {
            this.renderer.removeChild(document.body, this._backdropElement);
            this._backdropElement = null;
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
            this.renderer.setStyle(this._backdropElement, name, styles[name]);
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
    /* private get tourWindow(): HTMLElement {
      return this.document.getElementsByClassName(this.tourWindowClass).item(0) as HTMLElement;
    } */
    constructor(element, scrollService, tourService, tourStepTemplate, tourBackdrop, popover) {
        this.element = element;
        this.scrollService = scrollService;
        this.tourService = tourService;
        this.tourStepTemplate = tourStepTemplate;
        this.tourBackdrop = tourBackdrop;
        this.popover = popover;
        this.tourWindowClass = 'ngx-tour-window';
        this.click = new EventEmitter();
        this.popover.autoClose = false;
        this.popover.triggers = '';
        this.popover.popoverClass = this.tourWindowClass;
        this.popover.toggle = () => { };
    }
    ngAfterViewInit() {
        this.tourService.register(this.tourAnchor, this);
    }
    ngOnDestroy() {
        this.tourService.unregister(this.tourAnchor);
        this.click.complete();
    }
    showTourStep(step) {
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
    }
    hideTourStep() {
        this.step = null;
        this.isActive = false;
        this.popover.close();
        if (this.tourService.getStatus() === TourState.OFF) {
            this.tourBackdrop.close();
        }
    }
    /** Open the tour window with ngb-popover */
    openTourWindow() {
        // Scroll the tour window into view after ngbPopover is opened
        this.popover.shown.pipe(takeUntil(this.tourService.stepHide$)).subscribe(() => {
            if (!this.step.preventScrolling) {
                this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
        });
        if (this.popover.isOpen()) {
            this.popover.hidden.pipe(take(1), tap(() => this.popover.open({ step: this.step }))).subscribe();
        }
        else {
            this.popover.open({ step: this.step });
        }
    }
    /** Set a backdrop that highlights the tour anchor element or a custom input element */
    setBackdrop() {
        const targetElement = this.focusedElement || this.element;
        if (this.step.enableBackdrop) {
            this.tourBackdrop.show(targetElement);
            // Adjust the backdrop position on scroll
            this.scrollService.ancestorScrolled(this.element, 0).pipe(takeUntil(this.tourService.stepHide$), tap(() => this.tourBackdrop.show(targetElement))).subscribe();
            if (this.click.observers.length) {
                this.tourBackdrop.backdropElement.classList.add('clickable');
            }
            fromEvent(this.tourBackdrop.backdropElement, 'click').pipe(tap(() => this.click.next())).subscribe();
        }
        else {
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
    { type: ScrollDispatcher },
    { type: NgbTourService },
    { type: TourStepTemplateService },
    { type: TourBackdropService },
    { type: TourAnchorNgBootstrapPopoverDirective, decorators: [{ type: Host }] }
];
TourAnchorNgBootstrapDirective.propDecorators = {
    tourAnchor: [{ type: Input }],
    focusedElement: [{ type: Input }],
    click: [{ type: Output, args: ['tourAnchorClick',] }],
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
                imports: [CommonModule, NgbPopoverModule, ScrollingModule],
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
