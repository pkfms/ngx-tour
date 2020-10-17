import { Directive, ElementRef, Host, HostBinding, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { takeUntil, tap } from 'rxjs/operators';
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
    constructor(element, scrollService, tourService, tourStepTemplate, tourBackdrop, popoverDirective, doc) {
        this.element = element;
        this.scrollService = scrollService;
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
    ngAfterViewInit() {
        this.tourService.register(this.tourAnchor, this);
    }
    ngOnDestroy() {
        this.tourService.unregister(this.tourAnchor);
    }
    showTourStep(step) {
        this.step = step;
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
        this.openTourWindow();
        this.setBackdrop();
    }
    hideTourStep() {
        this.step = null;
        this.isActive = false;
        this.popoverDirective.close();
        if (this.tourService.getStatus() === TourState.OFF) {
            this.tourBackdrop.close();
        }
    }
    /** Open the tour window with ngb-popover */
    openTourWindow() {
        // Scroll the tour window into view after ngbPopover is opened
        this.popoverDirective.shown.subscribe(() => {
            if (!this.step.preventScrolling) {
                this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
            }
        });
        this.popoverDirective.open({ step: this.step });
    }
    /** Set a backdrop that highlights the tour anchor element or a custom input element */
    setBackdrop() {
        const targetElement = this.focusedElement || this.element;
        if (this.step.enableBackdrop) {
            this.tourBackdrop.show(targetElement);
            // Adjust the backdrop position on scroll
            this.scrollService.ancestorScrolled(this.element, 0).pipe(takeUntil(this.tourService.stepHide$), tap(() => this.tourBackdrop.show(targetElement))).subscribe();
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
    { type: TourAnchorNgBootstrapPopoverDirective, decorators: [{ type: Host }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
TourAnchorNgBootstrapDirective.propDecorators = {
    tourAnchor: [{ type: Input }],
    focusedElement: [{ type: Input }],
    isActive: [{ type: HostBinding, args: ['class.touranchor--is-active',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1hbmNob3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L3NvdXJjZS9yZXBvcy9uZ3gtdG91ci9wcm9qZWN0cy9uZ3gtdG91ci1uZy1ib290c3RyYXAvc3JjLyIsInNvdXJjZXMiOlsibGliL3RvdXItYW5jaG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQXVCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHOUQsTUFBTSxPQUFPLHFDQUFzQyxTQUFRLFVBQVU7OztZQURwRSxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFOztBQU12QyxNQUFNLE9BQU8sOEJBQThCO0lBV3pDOztRQUVJO0lBRUosWUFDVSxPQUFtQixFQUNuQixhQUErQixFQUMvQixXQUEyQixFQUMzQixnQkFBeUMsRUFDekMsWUFBaUMsRUFDekIsZ0JBQXVELEVBQzdDLEdBQVM7UUFOM0IsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0Is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aWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ2JQb3BvdmVyLCBQbGFjZW1lbnQgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBUb3VyQW5jaG9yRGlyZWN0aXZlLCBUb3VyU3RhdGUgfSBmcm9tICduZ3gtdG91ci1jb3JlJztcbmltcG9ydCB7IE5nYlRvdXJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ib290c3RyYXAtdG91ci5zZXJ2aWNlJztcbmltcG9ydCB7IElOZ2JTdGVwT3B0aW9uIH0gZnJvbSAnLi9zdGVwLW9wdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3RvdXItc3RlcC10ZW1wbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRvdXJCYWNrZHJvcFNlcnZpY2UgfSBmcm9tICcuL3RvdXItYmFja2Ryb3Auc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0b3VyQW5jaG9yXScgfSlcbmV4cG9ydCBjbGFzcyBUb3VyQW5jaG9yTmdCb290c3RyYXBQb3BvdmVyRGlyZWN0aXZlIGV4dGVuZHMgTmdiUG9wb3ZlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RvdXJBbmNob3JdJyxcbn0pXG5leHBvcnQgY2xhc3MgVG91ckFuY2hvck5nQm9vdHN0cmFwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBUb3VyQW5jaG9yRGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSB0b3VyV2luZG93Q2xhc3MgPSAnbmd4LXRvdXItd2luZG93JztcbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQ7XG4gIHByaXZhdGUgc3RlcDogSU5nYlN0ZXBPcHRpb247XG5cbiAgQElucHV0KCkgcHVibGljIHRvdXJBbmNob3I6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGZvY3VzZWRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRvdXJhbmNob3ItLWlzLWFjdGl2ZScpXG4gIHB1YmxpYyBpc0FjdGl2ZTogYm9vbGVhbjtcblxuICAvKiBwcml2YXRlIGdldCB0b3VyV2luZG93KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudG91cldpbmRvd0NsYXNzKS5pdGVtKDApIGFzIEhUTUxFbGVtZW50O1xuICB9ICovXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgc2Nyb2xsU2VydmljZTogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBwcml2YXRlIHRvdXJTZXJ2aWNlOiBOZ2JUb3VyU2VydmljZSxcbiAgICBwcml2YXRlIHRvdXJTdGVwVGVtcGxhdGU6IFRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG91ckJhY2tkcm9wOiBUb3VyQmFja2Ryb3BTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBwb3BvdmVyRGlyZWN0aXZlOiBUb3VyQW5jaG9yTmdCb290c3RyYXBQb3BvdmVyRGlyZWN0aXZlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jPzogYW55XG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2M7XG5cbiAgICB0aGlzLnBvcG92ZXJEaXJlY3RpdmUuYXV0b0Nsb3NlID0gZmFsc2U7XG4gICAgdGhpcy5wb3BvdmVyRGlyZWN0aXZlLnRyaWdnZXJzID0gJyc7XG4gICAgdGhpcy5wb3BvdmVyRGlyZWN0aXZlLnBvcG92ZXJDbGFzcyA9IHRoaXMudG91cldpbmRvd0NsYXNzO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS50b2dnbGUgPSAoKSA9PiB7IH07XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudG91clNlcnZpY2UucmVnaXN0ZXIodGhpcy50b3VyQW5jaG9yLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvdXJTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy50b3VyQW5jaG9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93VG91clN0ZXAoc3RlcDogSU5nYlN0ZXBPcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5uZ2JQb3BvdmVyID0gdGhpcy50b3VyU3RlcFRlbXBsYXRlLnRlbXBsYXRlO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5wb3BvdmVyVGl0bGUgPSBzdGVwLnRpdGxlO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5jb250YWluZXIgPSAgJ2JvZHknO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5wbGFjZW1lbnQgPSA8UGxhY2VtZW50PihzdGVwLnBsYWNlbWVudCB8fCAndG9wJylcbiAgICAgIC5yZXBsYWNlKCdiZWZvcmUnLCAnbGVmdCcpLnJlcGxhY2UoJ2FmdGVyJywgJ3JpZ2h0JylcbiAgICAgIC5yZXBsYWNlKCdiZWxvdycsICdib3R0b20nKS5yZXBsYWNlKCdhYm92ZScsICd0b3AnKTtcbiAgICBzdGVwLnByZXZCdG5UaXRsZSA9IHN0ZXAucHJldkJ0blRpdGxlIHx8ICdQcmV2JztcbiAgICBzdGVwLm5leHRCdG5UaXRsZSA9IHN0ZXAubmV4dEJ0blRpdGxlIHx8ICdOZXh0JztcbiAgICBzdGVwLmVuZEJ0blRpdGxlID0gc3RlcC5lbmRCdG5UaXRsZSB8fCAnRW5kJztcblxuICAgIHRoaXMub3BlblRvdXJXaW5kb3coKTtcbiAgICB0aGlzLnNldEJhY2tkcm9wKCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZVRvdXJTdGVwKCk6IHZvaWQge1xuICAgIHRoaXMuc3RlcCA9IG51bGw7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5jbG9zZSgpO1xuICAgIGlmICh0aGlzLnRvdXJTZXJ2aWNlLmdldFN0YXR1cygpID09PSBUb3VyU3RhdGUuT0ZGKSB7XG4gICAgICB0aGlzLnRvdXJCYWNrZHJvcC5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSB0b3VyIHdpbmRvdyB3aXRoIG5nYi1wb3BvdmVyICovXG4gIHByaXZhdGUgb3BlblRvdXJXaW5kb3coKTogdm9pZCB7XG4gICAgLy8gU2Nyb2xsIHRoZSB0b3VyIHdpbmRvdyBpbnRvIHZpZXcgYWZ0ZXIgbmdiUG9wb3ZlciBpcyBvcGVuZWRcbiAgICB0aGlzLnBvcG92ZXJEaXJlY3RpdmUuc2hvd24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zdGVwLnByZXZlbnRTY3JvbGxpbmcpIHtcbiAgICAgICAgKDxIVE1MRWxlbWVudD50aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnc3RhcnQnLCBpbmxpbmU6ICdjZW50ZXInIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5wb3BvdmVyRGlyZWN0aXZlLm9wZW4oeyBzdGVwOiB0aGlzLnN0ZXAgfSk7XG4gIH1cblxuICAvKiogU2V0IGEgYmFja2Ryb3AgdGhhdCBoaWdobGlnaHRzIHRoZSB0b3VyIGFuY2hvciBlbGVtZW50IG9yIGEgY3VzdG9tIGlucHV0IGVsZW1lbnQgKi9cbiAgcHJpdmF0ZSBzZXRCYWNrZHJvcCgpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gdGhpcy5mb2N1c2VkRWxlbWVudCB8fCB0aGlzLmVsZW1lbnQ7XG5cbiAgICBpZiAodGhpcy5zdGVwLmVuYWJsZUJhY2tkcm9wKSB7XG4gICAgICB0aGlzLnRvdXJCYWNrZHJvcC5zaG93KHRhcmdldEVsZW1lbnQpO1xuICAgICAgLy8gQWRqdXN0IHRoZSBiYWNrZHJvcCBwb3NpdGlvbiBvbiBzY3JvbGxcbiAgICAgIHRoaXMuc2Nyb2xsU2VydmljZS5hbmNlc3RvclNjcm9sbGVkKHRoaXMuZWxlbWVudCwgMCkucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudG91clNlcnZpY2Uuc3RlcEhpZGUkKSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMudG91ckJhY2tkcm9wLnNob3codGFyZ2V0RWxlbWVudCkpXG4gICAgICApLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvdXJCYWNrZHJvcC5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuIl19