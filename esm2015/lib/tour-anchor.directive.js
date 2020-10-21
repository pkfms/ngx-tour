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
        this.popover.placement = (step.placement || 'top')
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
                this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1hbmNob3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L3NvdXJjZS9yZXBvcy9uZ3gtdG91ci9wcm9qZWN0cy9uZ3gtdG91ci1uZy1ib290c3RyYXAvc3JjLyIsInNvdXJjZXMiOlsibGliL3RvdXItYW5jaG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQXVCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHOUQsTUFBTSxPQUFPLHFDQUFzQyxTQUFRLFVBQVU7OztZQURwRSxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFOztBQU12QyxNQUFNLE9BQU8sOEJBQThCO0lBV3pDOztRQUVJO0lBRUosWUFDVSxPQUFtQixFQUNuQixhQUErQixFQUMvQixXQUEyQixFQUMzQixnQkFBeUMsRUFDekMsWUFBaUMsRUFDekIsT0FBOEM7UUFMdEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7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RWQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDOUQ7WUFFRCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN4RCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUM3QixDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7WUE5R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7WUFqQjZDLFVBQVU7WUFFL0MsZ0JBQWdCO1lBS2hCLGNBQWM7WUFFZCx1QkFBdUI7WUFDdkIsbUJBQW1CO1lBNkJDLHFDQUFxQyx1QkFBN0QsSUFBSTs7O3lCQWpCTixLQUFLOzZCQUNMLEtBQUs7b0JBQ0wsTUFBTSxTQUFDLGlCQUFpQjt1QkFFeEIsV0FBVyxTQUFDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ2JQb3BvdmVyLCBQbGFjZW1lbnQgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBUb3VyQW5jaG9yRGlyZWN0aXZlLCBUb3VyU3RhdGUgfSBmcm9tICduZ3gtdG91ci1jb3JlJztcbmltcG9ydCB7IE5nYlRvdXJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ib290c3RyYXAtdG91ci5zZXJ2aWNlJztcbmltcG9ydCB7IElOZ2JTdGVwT3B0aW9uIH0gZnJvbSAnLi9zdGVwLW9wdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3RvdXItc3RlcC10ZW1wbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRvdXJCYWNrZHJvcFNlcnZpY2UgfSBmcm9tICcuL3RvdXItYmFja2Ryb3Auc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0b3VyQW5jaG9yXScgfSlcbmV4cG9ydCBjbGFzcyBUb3VyQW5jaG9yTmdCb290c3RyYXBQb3BvdmVyRGlyZWN0aXZlIGV4dGVuZHMgTmdiUG9wb3ZlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RvdXJBbmNob3JdJyxcbn0pXG5leHBvcnQgY2xhc3MgVG91ckFuY2hvck5nQm9vdHN0cmFwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBUb3VyQW5jaG9yRGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSB0b3VyV2luZG93Q2xhc3MgPSAnbmd4LXRvdXItd2luZG93JztcbiAgcHJpdmF0ZSBzdGVwOiBJTmdiU3RlcE9wdGlvbjtcblxuICBASW5wdXQoKSBwdWJsaWMgdG91ckFuY2hvcjogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZm9jdXNlZEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAT3V0cHV0KCd0b3VyQW5jaG9yQ2xpY2snKSBwdWJsaWMgY2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRvdXJhbmNob3ItLWlzLWFjdGl2ZScpXG4gIHB1YmxpYyBpc0FjdGl2ZTogYm9vbGVhbjtcblxuICAvKiBwcml2YXRlIGdldCB0b3VyV2luZG93KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudG91cldpbmRvd0NsYXNzKS5pdGVtKDApIGFzIEhUTUxFbGVtZW50O1xuICB9ICovXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgc2Nyb2xsU2VydmljZTogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBwcml2YXRlIHRvdXJTZXJ2aWNlOiBOZ2JUb3VyU2VydmljZSxcbiAgICBwcml2YXRlIHRvdXJTdGVwVGVtcGxhdGU6IFRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG91ckJhY2tkcm9wOiBUb3VyQmFja2Ryb3BTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBwb3BvdmVyOiBUb3VyQW5jaG9yTmdCb290c3RyYXBQb3BvdmVyRGlyZWN0aXZlXG4gICkge1xuICAgIHRoaXMucG9wb3Zlci5hdXRvQ2xvc2UgPSBmYWxzZTtcbiAgICB0aGlzLnBvcG92ZXIudHJpZ2dlcnMgPSAnJztcbiAgICB0aGlzLnBvcG92ZXIucG9wb3ZlckNsYXNzID0gdGhpcy50b3VyV2luZG93Q2xhc3M7XG4gICAgdGhpcy5wb3BvdmVyLnRvZ2dsZSA9ICgpID0+IHsgfTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy50b3VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnRvdXJBbmNob3IsIHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudG91clNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLnRvdXJBbmNob3IpO1xuICAgIHRoaXMuY2xpY2suY29tcGxldGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93VG91clN0ZXAoc3RlcDogSU5nYlN0ZXBPcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucG9wb3Zlci5uZ2JQb3BvdmVyID0gdGhpcy50b3VyU3RlcFRlbXBsYXRlLnRlbXBsYXRlO1xuICAgIHRoaXMucG9wb3Zlci5wb3BvdmVyVGl0bGUgPSBzdGVwLnRpdGxlO1xuICAgIHRoaXMucG9wb3Zlci5jb250YWluZXIgPSAgJ2JvZHknO1xuICAgIHRoaXMucG9wb3Zlci5wbGFjZW1lbnQgPSA8UGxhY2VtZW50PihzdGVwLnBsYWNlbWVudCB8fCAndG9wJylcbiAgICAgIC5yZXBsYWNlKCdiZWZvcmUnLCAnbGVmdCcpLnJlcGxhY2UoJ2FmdGVyJywgJ3JpZ2h0JylcbiAgICAgIC5yZXBsYWNlKCdiZWxvdycsICdib3R0b20nKS5yZXBsYWNlKCdhYm92ZScsICd0b3AnKTtcbiAgICBzdGVwLnByZXZCdG5UaXRsZSA9IHN0ZXAucHJldkJ0blRpdGxlIHx8ICdQcmV2JztcbiAgICBzdGVwLm5leHRCdG5UaXRsZSA9IHN0ZXAubmV4dEJ0blRpdGxlIHx8ICdOZXh0JztcbiAgICBzdGVwLmVuZEJ0blRpdGxlID0gc3RlcC5lbmRCdG5UaXRsZSB8fCAnRW5kJztcblxuICAgIHRoaXMub3BlblRvdXJXaW5kb3coKTtcbiAgICB0aGlzLnNldEJhY2tkcm9wKCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZVRvdXJTdGVwKCk6IHZvaWQge1xuICAgIHRoaXMuc3RlcCA9IG51bGw7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMucG9wb3Zlci5jbG9zZSgpO1xuICAgIGlmICh0aGlzLnRvdXJTZXJ2aWNlLmdldFN0YXR1cygpID09PSBUb3VyU3RhdGUuT0ZGKSB7XG4gICAgICB0aGlzLnRvdXJCYWNrZHJvcC5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSB0b3VyIHdpbmRvdyB3aXRoIG5nYi1wb3BvdmVyICovXG4gIHByaXZhdGUgb3BlblRvdXJXaW5kb3coKTogdm9pZCB7XG4gICAgLy8gU2Nyb2xsIHRoZSB0b3VyIHdpbmRvdyBpbnRvIHZpZXcgYWZ0ZXIgbmdiUG9wb3ZlciBpcyBvcGVuZWRcbiAgICB0aGlzLnBvcG92ZXIuc2hvd24ucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLnRvdXJTZXJ2aWNlLnN0ZXBIaWRlJClcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc3RlcC5wcmV2ZW50U2Nyb2xsaW5nKSB7XG4gICAgICAgICg8SFRNTEVsZW1lbnQ+dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ3N0YXJ0JywgaW5saW5lOiAnY2VudGVyJyB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnBvcG92ZXIuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMucG9wb3Zlci5oaWRkZW4ucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMucG9wb3Zlci5vcGVuKHsgc3RlcDogdGhpcy5zdGVwIH0pKVxuICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3BvdmVyLm9wZW4oeyBzdGVwOiB0aGlzLnN0ZXAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldCBhIGJhY2tkcm9wIHRoYXQgaGlnaGxpZ2h0cyB0aGUgdG91ciBhbmNob3IgZWxlbWVudCBvciBhIGN1c3RvbSBpbnB1dCBlbGVtZW50ICovXG4gIHByaXZhdGUgc2V0QmFja2Ryb3AoKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRoaXMuZm9jdXNlZEVsZW1lbnQgfHwgdGhpcy5lbGVtZW50O1xuXG4gICAgaWYgKHRoaXMuc3RlcC5lbmFibGVCYWNrZHJvcCkge1xuICAgICAgdGhpcy50b3VyQmFja2Ryb3Auc2hvdyh0YXJnZXRFbGVtZW50KTtcbiAgICAgIC8vIEFkanVzdCB0aGUgYmFja2Ryb3AgcG9zaXRpb24gb24gc2Nyb2xsXG4gICAgICB0aGlzLnNjcm9sbFNlcnZpY2UuYW5jZXN0b3JTY3JvbGxlZCh0aGlzLmVsZW1lbnQsIDApLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLnRvdXJTZXJ2aWNlLnN0ZXBIaWRlJCksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLnRvdXJCYWNrZHJvcC5zaG93KHRhcmdldEVsZW1lbnQpKVxuICAgICAgKS5zdWJzY3JpYmUoKTtcblxuICAgICAgaWYgKHRoaXMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRvdXJCYWNrZHJvcC5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2xpY2thYmxlJyk7XG4gICAgICB9XG5cbiAgICAgIGZyb21FdmVudCh0aGlzLnRvdXJCYWNrZHJvcC5iYWNrZHJvcEVsZW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLmNsaWNrLm5leHQoKSlcbiAgICAgICkuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG91ckJhY2tkcm9wLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=