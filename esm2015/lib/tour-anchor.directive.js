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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1hbmNob3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L3NvdXJjZS9yZXBvcy9uZ3gtdG91ci9wcm9qZWN0cy9uZ3gtdG91ci1uZy1ib290c3RyYXAvc3JjLyIsInNvdXJjZXMiOlsibGliL3RvdXItYW5jaG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQXVCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHOUQsTUFBTSxPQUFPLHFDQUFzQyxTQUFRLFVBQVU7OztZQURwRSxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFOztBQU12QyxNQUFNLE9BQU8sOEJBQThCO0lBV3pDOztRQUVJO0lBRUosWUFDVSxPQUFtQixFQUNuQixhQUErQixFQUMvQixXQUEyQixFQUMzQixnQkFBeUMsRUFDekMsWUFBaUMsRUFDekIsT0FBOEM7UUFMdEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7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QUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEQsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FDN0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7O1lBNUdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYzthQUN6Qjs7O1lBaEI2QyxVQUFVO1lBQy9DLGdCQUFnQjtZQUtoQixjQUFjO1lBRWQsdUJBQXVCO1lBQ3ZCLG1CQUFtQjtZQTZCQyxxQ0FBcUMsdUJBQTdELElBQUk7Ozt5QkFqQk4sS0FBSzs2QkFDTCxLQUFLO29CQUNMLE1BQU0sU0FBQyxpQkFBaUI7dUJBRXhCLFdBQVcsU0FBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdCwgSG9zdEJpbmRpbmcsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nYlBvcG92ZXIgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBUb3VyQW5jaG9yRGlyZWN0aXZlLCBUb3VyU3RhdGUgfSBmcm9tICduZ3gtdG91ci1jb3JlJztcbmltcG9ydCB7IE5nYlRvdXJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ib290c3RyYXAtdG91ci5zZXJ2aWNlJztcbmltcG9ydCB7IElOZ2JTdGVwT3B0aW9uIH0gZnJvbSAnLi9zdGVwLW9wdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3RvdXItc3RlcC10ZW1wbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRvdXJCYWNrZHJvcFNlcnZpY2UgfSBmcm9tICcuL3RvdXItYmFja2Ryb3Auc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0b3VyQW5jaG9yXScgfSlcbmV4cG9ydCBjbGFzcyBUb3VyQW5jaG9yTmdCb290c3RyYXBQb3BvdmVyRGlyZWN0aXZlIGV4dGVuZHMgTmdiUG9wb3ZlciB7IH1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RvdXJBbmNob3JdJyxcbn0pXG5leHBvcnQgY2xhc3MgVG91ckFuY2hvck5nQm9vdHN0cmFwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBUb3VyQW5jaG9yRGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSB0b3VyV2luZG93Q2xhc3MgPSAnbmd4LXRvdXItd2luZG93JztcbiAgcHJpdmF0ZSBzdGVwOiBJTmdiU3RlcE9wdGlvbjtcblxuICBASW5wdXQoKSBwdWJsaWMgdG91ckFuY2hvcjogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZm9jdXNlZEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAT3V0cHV0KCd0b3VyQW5jaG9yQ2xpY2snKSBwdWJsaWMgY2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRvdXJhbmNob3ItLWlzLWFjdGl2ZScpXG4gIHB1YmxpYyBpc0FjdGl2ZTogYm9vbGVhbjtcblxuICAvKiBwcml2YXRlIGdldCB0b3VyV2luZG93KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudG91cldpbmRvd0NsYXNzKS5pdGVtKDApIGFzIEhUTUxFbGVtZW50O1xuICB9ICovXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgc2Nyb2xsU2VydmljZTogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBwcml2YXRlIHRvdXJTZXJ2aWNlOiBOZ2JUb3VyU2VydmljZSxcbiAgICBwcml2YXRlIHRvdXJTdGVwVGVtcGxhdGU6IFRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG91ckJhY2tkcm9wOiBUb3VyQmFja2Ryb3BTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBwb3BvdmVyOiBUb3VyQW5jaG9yTmdCb290c3RyYXBQb3BvdmVyRGlyZWN0aXZlXG4gICkge1xuICAgIHRoaXMucG9wb3Zlci5hdXRvQ2xvc2UgPSBmYWxzZTtcbiAgICB0aGlzLnBvcG92ZXIudHJpZ2dlcnMgPSAnJztcbiAgICB0aGlzLnBvcG92ZXIucG9wb3ZlckNsYXNzID0gdGhpcy50b3VyV2luZG93Q2xhc3M7XG4gICAgdGhpcy5wb3BvdmVyLnRvZ2dsZSA9ICgpID0+IHsgfTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy50b3VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnRvdXJBbmNob3IsIHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudG91clNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLnRvdXJBbmNob3IpO1xuICAgIHRoaXMuY2xpY2suY29tcGxldGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93VG91clN0ZXAoc3RlcDogSU5nYlN0ZXBPcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucG9wb3Zlci5uZ2JQb3BvdmVyID0gdGhpcy50b3VyU3RlcFRlbXBsYXRlLnRlbXBsYXRlO1xuICAgIHRoaXMucG9wb3Zlci5wb3BvdmVyVGl0bGUgPSBzdGVwLnRpdGxlO1xuICAgIHRoaXMucG9wb3Zlci5jb250YWluZXIgPSAnYm9keSc7XG4gICAgdGhpcy5wb3BvdmVyLnBsYWNlbWVudCA9IHN0ZXAucGxhY2VtZW50IHx8ICdhdXRvJztcbiAgICBzdGVwLnByZXZCdG5UaXRsZSA9IHN0ZXAucHJldkJ0blRpdGxlIHx8ICdQcmV2JztcbiAgICBzdGVwLm5leHRCdG5UaXRsZSA9IHN0ZXAubmV4dEJ0blRpdGxlIHx8ICdOZXh0JztcbiAgICBzdGVwLmVuZEJ0blRpdGxlID0gc3RlcC5lbmRCdG5UaXRsZSB8fCAnRW5kJztcblxuICAgIHRoaXMub3BlblRvdXJXaW5kb3coKTtcbiAgICB0aGlzLnNldEJhY2tkcm9wKCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZVRvdXJTdGVwKCk6IHZvaWQge1xuICAgIHRoaXMuc3RlcCA9IG51bGw7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMucG9wb3Zlci5jbG9zZSgpO1xuICAgIGlmICh0aGlzLnRvdXJTZXJ2aWNlLmdldFN0YXR1cygpID09PSBUb3VyU3RhdGUuT0ZGKSB7XG4gICAgICB0aGlzLnRvdXJCYWNrZHJvcC5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSB0b3VyIHdpbmRvdyB3aXRoIG5nYi1wb3BvdmVyICovXG4gIHByaXZhdGUgb3BlblRvdXJXaW5kb3coKTogdm9pZCB7XG4gICAgLy8gU2Nyb2xsIHRoZSB0b3VyIHdpbmRvdyBpbnRvIHZpZXcgYWZ0ZXIgbmdiUG9wb3ZlciBpcyBvcGVuZWRcbiAgICB0aGlzLnBvcG92ZXIuc2hvd24ucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLnRvdXJTZXJ2aWNlLnN0ZXBIaWRlJClcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc3RlcC5wcmV2ZW50U2Nyb2xsaW5nKSB7XG4gICAgICAgICg8SFRNTEVsZW1lbnQ+dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ3N0YXJ0JywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wb3BvdmVyLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLnBvcG92ZXIuaGlkZGVuLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLnBvcG92ZXIub3Blbih7IHN0ZXA6IHRoaXMuc3RlcCB9KSlcbiAgICAgICkuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9wb3Zlci5vcGVuKHsgc3RlcDogdGhpcy5zdGVwIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXQgYSBiYWNrZHJvcCB0aGF0IGhpZ2hsaWdodHMgdGhlIHRvdXIgYW5jaG9yIGVsZW1lbnQgb3IgYSBjdXN0b20gaW5wdXQgZWxlbWVudCAqL1xuICBwcml2YXRlIHNldEJhY2tkcm9wKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0aGlzLmZvY3VzZWRFbGVtZW50IHx8IHRoaXMuZWxlbWVudDtcblxuICAgIGlmICh0aGlzLnN0ZXAuZW5hYmxlQmFja2Ryb3ApIHtcbiAgICAgIHRoaXMudG91ckJhY2tkcm9wLnNob3codGFyZ2V0RWxlbWVudCk7XG4gICAgICAvLyBBZGp1c3QgdGhlIGJhY2tkcm9wIHBvc2l0aW9uIG9uIHNjcm9sbFxuICAgICAgdGhpcy5zY3JvbGxTZXJ2aWNlLmFuY2VzdG9yU2Nyb2xsZWQodGhpcy5lbGVtZW50LCAwKS5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy50b3VyU2VydmljZS5zdGVwSGlkZSQpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy50b3VyQmFja2Ryb3Auc2hvdyh0YXJnZXRFbGVtZW50KSlcbiAgICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICAgIGlmICh0aGlzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy50b3VyQmFja2Ryb3AuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NsaWNrYWJsZScpO1xuICAgICAgfVxuXG4gICAgICBmcm9tRXZlbnQodGhpcy50b3VyQmFja2Ryb3AuYmFja2Ryb3BFbGVtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5jbGljay5uZXh0KCkpXG4gICAgICApLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvdXJCYWNrZHJvcC5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuIl19