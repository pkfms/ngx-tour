import { Directive, ElementRef, Host, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { fromEvent } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TourState } from 'ngx-tour-core';
import { NgbTourService } from './ng-bootstrap-tour.service';
import { TourStepTemplateService } from './tour-step-template.service';
import { TourBackdropService } from './tour-backdrop.service';
export class TourAnchorNgBootstrapPopoverDirective extends NgbPopover {
}
TourAnchorNgBootstrapPopoverDirective.decorators = [
    { type: Directive, args: [{ selector: '[tourAnchor]' },] }
];
export class TourAnchorNgBootstrapDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1hbmNob3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL25neC10b3VyLW5nLWJvb3RzdHJhcC9zcmMvIiwic291cmNlcyI6WyJsaWIvdG91ci1hbmNob3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBNEIsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBdUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUc5RCxNQUFNLE9BQU8scUNBQXNDLFNBQVEsVUFBVTs7O1lBRHBFLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7O0FBTXZDLE1BQU0sT0FBTyw4QkFBOEI7SUFXekM7O1FBRUk7SUFFSixZQUNVLE9BQW1CLEVBQ25CLGFBQStCLEVBQy9CLFdBQTJCLEVBQzNCLGdCQUF5QyxFQUN6QyxZQUFpQyxFQUN6QixPQUE4QztRQUx0RCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUMvQixnQkFBVyxHQUFY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QUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN4RCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUM3QixDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7WUE1R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7WUFoQjZDLFVBQVU7WUFDL0MsZ0JBQWdCO1lBS2hCLGNBQWM7WUFFZCx1QkFBdUI7WUFDdkIsbUJBQW1CO1lBNkJDLHFDQUFxQyx1QkFBN0QsSUFBSTs7O3lCQWpCTixLQUFLOzZCQUNMLEtBQUs7b0JBQ0wsTUFBTSxTQUFDLGlCQUFpQjt1QkFFeEIsV0FBVyxTQUFDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBIb3N0QmluZGluZywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmdiUG9wb3ZlciB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IFRvdXJBbmNob3JEaXJlY3RpdmUsIFRvdXJTdGF0ZSB9IGZyb20gJ25neC10b3VyLWNvcmUnO1xuaW1wb3J0IHsgTmdiVG91clNlcnZpY2UgfSBmcm9tICcuL25nLWJvb3RzdHJhcC10b3VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSU5nYlN0ZXBPcHRpb24gfSBmcm9tICcuL3N0ZXAtb3B0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUb3VyU3RlcFRlbXBsYXRlU2VydmljZSB9IGZyb20gJy4vdG91ci1zdGVwLXRlbXBsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG91ckJhY2tkcm9wU2VydmljZSB9IGZyb20gJy4vdG91ci1iYWNrZHJvcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3RvdXJBbmNob3JdJyB9KVxuZXhwb3J0IGNsYXNzIFRvdXJBbmNob3JOZ0Jvb3RzdHJhcFBvcG92ZXJEaXJlY3RpdmUgZXh0ZW5kcyBOZ2JQb3BvdmVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG91ckFuY2hvcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBUb3VyQW5jaG9yTmdCb290c3RyYXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIFRvdXJBbmNob3JEaXJlY3RpdmUge1xuICBwcml2YXRlIHRvdXJXaW5kb3dDbGFzcyA9ICduZ3gtdG91ci13aW5kb3cnO1xuICBwcml2YXRlIHN0ZXA6IElOZ2JTdGVwT3B0aW9uO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyB0b3VyQW5jaG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBmb2N1c2VkRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBPdXRwdXQoJ3RvdXJBbmNob3JDbGljaycpIHB1YmxpYyBjbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudG91cmFuY2hvci0taXMtYWN0aXZlJylcbiAgcHVibGljIGlzQWN0aXZlOiBib29sZWFuO1xuXG4gIC8qIHByaXZhdGUgZ2V0IHRvdXJXaW5kb3coKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50b3VyV2luZG93Q2xhc3MpLml0ZW0oMCkgYXMgSFRNTEVsZW1lbnQ7XG4gIH0gKi9cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBzY3JvbGxTZXJ2aWNlOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIHByaXZhdGUgdG91clNlcnZpY2U6IE5nYlRvdXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG91clN0ZXBUZW1wbGF0ZTogVG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b3VyQmFja2Ryb3A6IFRvdXJCYWNrZHJvcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIHBvcG92ZXI6IFRvdXJBbmNob3JOZ0Jvb3RzdHJhcFBvcG92ZXJEaXJlY3RpdmVcbiAgKSB7XG4gICAgdGhpcy5wb3BvdmVyLmF1dG9DbG9zZSA9IGZhbHNlO1xuICAgIHRoaXMucG9wb3Zlci50cmlnZ2VycyA9ICcnO1xuICAgIHRoaXMucG9wb3Zlci5wb3BvdmVyQ2xhc3MgPSB0aGlzLnRvdXJXaW5kb3dDbGFzcztcbiAgICB0aGlzLnBvcG92ZXIudG9nZ2xlID0gKCkgPT4geyB9O1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRvdXJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMudG91ckFuY2hvciwgdGhpcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy50b3VyU2VydmljZS51bnJlZ2lzdGVyKHRoaXMudG91ckFuY2hvcik7XG4gICAgdGhpcy5jbGljay5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHVibGljIHNob3dUb3VyU3RlcChzdGVwOiBJTmdiU3RlcE9wdGlvbik6IHZvaWQge1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5wb3BvdmVyLm5nYlBvcG92ZXIgPSB0aGlzLnRvdXJTdGVwVGVtcGxhdGUudGVtcGxhdGU7XG4gICAgdGhpcy5wb3BvdmVyLnBvcG92ZXJUaXRsZSA9IHN0ZXAudGl0bGU7XG4gICAgdGhpcy5wb3BvdmVyLmNvbnRhaW5lciA9ICdib2R5JztcbiAgICB0aGlzLnBvcG92ZXIucGxhY2VtZW50ID0gc3RlcC5wbGFjZW1lbnQgfHwgJ2F1dG8nO1xuICAgIHN0ZXAucHJldkJ0blRpdGxlID0gc3RlcC5wcmV2QnRuVGl0bGUgfHwgJ1ByZXYnO1xuICAgIHN0ZXAubmV4dEJ0blRpdGxlID0gc3RlcC5uZXh0QnRuVGl0bGUgfHwgJ05leHQnO1xuICAgIHN0ZXAuZW5kQnRuVGl0bGUgPSBzdGVwLmVuZEJ0blRpdGxlIHx8ICdFbmQnO1xuXG4gICAgdGhpcy5vcGVuVG91cldpbmRvdygpO1xuICAgIHRoaXMuc2V0QmFja2Ryb3AoKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlVG91clN0ZXAoKTogdm9pZCB7XG4gICAgdGhpcy5zdGVwID0gbnVsbDtcbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5wb3BvdmVyLmNsb3NlKCk7XG4gICAgaWYgKHRoaXMudG91clNlcnZpY2UuZ2V0U3RhdHVzKCkgPT09IFRvdXJTdGF0ZS5PRkYpIHtcbiAgICAgIHRoaXMudG91ckJhY2tkcm9wLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE9wZW4gdGhlIHRvdXIgd2luZG93IHdpdGggbmdiLXBvcG92ZXIgKi9cbiAgcHJpdmF0ZSBvcGVuVG91cldpbmRvdygpOiB2b2lkIHtcbiAgICAvLyBTY3JvbGwgdGhlIHRvdXIgd2luZG93IGludG8gdmlldyBhZnRlciBuZ2JQb3BvdmVyIGlzIG9wZW5lZFxuICAgIHRoaXMucG9wb3Zlci5zaG93bi5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMudG91clNlcnZpY2Uuc3RlcEhpZGUkKVxuICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zdGVwLnByZXZlbnRTY3JvbGxpbmcpIHtcbiAgICAgICAgKDxIVE1MRWxlbWVudD50aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnc3RhcnQnLCBpbmxpbmU6ICduZWFyZXN0JyB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnBvcG92ZXIuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMucG9wb3Zlci5oaWRkZW4ucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMucG9wb3Zlci5vcGVuKHsgc3RlcDogdGhpcy5zdGVwIH0pKVxuICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3BvdmVyLm9wZW4oeyBzdGVwOiB0aGlzLnN0ZXAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldCBhIGJhY2tkcm9wIHRoYXQgaGlnaGxpZ2h0cyB0aGUgdG91ciBhbmNob3IgZWxlbWVudCBvciBhIGN1c3RvbSBpbnB1dCBlbGVtZW50ICovXG4gIHByaXZhdGUgc2V0QmFja2Ryb3AoKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXMuZm9jdXNlZEVsZW1lbnQgfHwgdGhpcy5lbGVtZW50O1xuXG4gICAgaWYgKHRoaXMuc3RlcC5lbmFibGVCYWNrZHJvcCkge1xuICAgICAgdGhpcy50b3VyQmFja2Ryb3Auc2hvdyh0YXJnZXRFbGVtZW50KTtcbiAgICAgIC8vIEFkanVzdCB0aGUgYmFja2Ryb3AgcG9zaXRpb24gb24gc2Nyb2xsXG4gICAgICB0aGlzLnNjcm9sbFNlcnZpY2UuYW5jZXN0b3JTY3JvbGxlZCh0aGlzLmVsZW1lbnQsIDApLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLnRvdXJTZXJ2aWNlLnN0ZXBIaWRlJCksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLnRvdXJCYWNrZHJvcC5zaG93KHRhcmdldEVsZW1lbnQpKVxuICAgICAgKS5zdWJzY3JpYmUoKTtcblxuICAgICAgaWYgKHRoaXMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRvdXJCYWNrZHJvcC5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2xpY2thYmxlJyk7XG4gICAgICB9XG5cbiAgICAgIGZyb21FdmVudCh0aGlzLnRvdXJCYWNrZHJvcC5iYWNrZHJvcEVsZW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLmNsaWNrLm5leHQoKSlcbiAgICAgICkuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG91ckJhY2tkcm9wLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=