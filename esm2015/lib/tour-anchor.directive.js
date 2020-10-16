import { Directive, ElementRef, Host, HostBinding, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1hbmNob3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L3NvdXJjZS9yZXBvcy9uZ3gtdG91ci9wcm9qZWN0cy9uZ3gtdG91ci1uZy1ib290c3RyYXAvc3JjLyIsInNvdXJjZXMiOlsibGliL3RvdXItYW5jaG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUF1QixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRzlELE1BQU0sT0FBTyxxQ0FBc0MsU0FBUSxVQUFVOzs7WUFEcEUsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTs7QUFNdkMsTUFBTSxPQUFPLDhCQUE4QjtJQWF6QyxZQUNVLE9BQW1CLEVBQ25CLFdBQTJCLEVBQzNCLGdCQUF5QyxFQUN6QyxZQUFpQyxFQUN6QixnQkFBdUQsRUFDN0MsR0FBUztRQUwzQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXlCO1FB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QUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQzlCLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUNyQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FDSCxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7OztZQXJGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7OztZQWpCbUIsVUFBVTtZQU9yQixjQUFjO1lBRWQsdUJBQXVCO1lBQ3ZCLG1CQUFtQjtZQTBCVSxxQ0FBcUMsdUJBQXRFLElBQUk7NENBQ0osTUFBTSxTQUFDLFFBQVE7Ozt5QkFmakIsS0FBSzt1QkFFTCxXQUFXLFNBQUMsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nYlBvcG92ZXIsIFBsYWNlbWVudCB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IFRvdXJBbmNob3JEaXJlY3RpdmUsIFRvdXJTdGF0ZSB9IGZyb20gJ25neC10b3VyLWNvcmUnO1xuaW1wb3J0IHsgTmdiVG91clNlcnZpY2UgfSBmcm9tICcuL25nLWJvb3RzdHJhcC10b3VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSU5nYlN0ZXBPcHRpb24gfSBmcm9tICcuL3N0ZXAtb3B0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUb3VyU3RlcFRlbXBsYXRlU2VydmljZSB9IGZyb20gJy4vdG91ci1zdGVwLXRlbXBsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG91ckJhY2tkcm9wU2VydmljZSB9IGZyb20gJy4vdG91ci1iYWNrZHJvcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3RvdXJBbmNob3JdJyB9KVxuZXhwb3J0IGNsYXNzIFRvdXJBbmNob3JOZ0Jvb3RzdHJhcFBvcG92ZXJEaXJlY3RpdmUgZXh0ZW5kcyBOZ2JQb3BvdmVyIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG91ckFuY2hvcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBUb3VyQW5jaG9yTmdCb290c3RyYXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgVG91ckFuY2hvckRpcmVjdGl2ZSB7XG4gIHByaXZhdGUgdG91cldpbmRvd0NsYXNzOiBzdHJpbmcgPSAnbmd4LXRvdXItd2luZG93JztcbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgQElucHV0KCkgcHVibGljIHRvdXJBbmNob3I6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRvdXJhbmNob3ItLWlzLWFjdGl2ZScpXG4gIHB1YmxpYyBpc0FjdGl2ZTogYm9vbGVhbjtcblxuICBnZXQgdG91cldpbmRvdygpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRvdXJXaW5kb3dDbGFzcykuaXRlbSgwKSBhcyBIVE1MRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHRvdXJTZXJ2aWNlOiBOZ2JUb3VyU2VydmljZSxcbiAgICBwcml2YXRlIHRvdXJTdGVwVGVtcGxhdGU6IFRvdXJTdGVwVGVtcGxhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG91ckJhY2tkcm9wOiBUb3VyQmFja2Ryb3BTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBwb3BvdmVyRGlyZWN0aXZlOiBUb3VyQW5jaG9yTmdCb290c3RyYXBQb3BvdmVyRGlyZWN0aXZlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jPzogYW55XG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2M7XG5cbiAgICB0aGlzLnBvcG92ZXJEaXJlY3RpdmUuYXV0b0Nsb3NlID0gZmFsc2U7XG4gICAgdGhpcy5wb3BvdmVyRGlyZWN0aXZlLnRyaWdnZXJzID0gJyc7XG4gICAgdGhpcy5wb3BvdmVyRGlyZWN0aXZlLnBvcG92ZXJDbGFzcyA9IHRoaXMudG91cldpbmRvd0NsYXNzO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS50b2dnbGUgPSAoKSA9PiB7IH07XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy50b3VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnRvdXJBbmNob3IsIHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudG91clNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLnRvdXJBbmNob3IpO1xuICB9XG5cbiAgcHVibGljIHNob3dUb3VyU3RlcChzdGVwOiBJTmdiU3RlcE9wdGlvbik6IHZvaWQge1xuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5uZ2JQb3BvdmVyID0gdGhpcy50b3VyU3RlcFRlbXBsYXRlLnRlbXBsYXRlO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5wb3BvdmVyVGl0bGUgPSBzdGVwLnRpdGxlO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5jb250YWluZXIgPSAgJ2JvZHknO1xuICAgIHRoaXMucG9wb3ZlckRpcmVjdGl2ZS5wbGFjZW1lbnQgPSA8UGxhY2VtZW50PihzdGVwLnBsYWNlbWVudCB8fCAndG9wJylcbiAgICAgIC5yZXBsYWNlKCdiZWZvcmUnLCAnbGVmdCcpLnJlcGxhY2UoJ2FmdGVyJywgJ3JpZ2h0JylcbiAgICAgIC5yZXBsYWNlKCdiZWxvdycsICdib3R0b20nKS5yZXBsYWNlKCdhYm92ZScsICd0b3AnKTtcbiAgICBzdGVwLnByZXZCdG5UaXRsZSA9IHN0ZXAucHJldkJ0blRpdGxlIHx8ICdQcmV2JztcbiAgICBzdGVwLm5leHRCdG5UaXRsZSA9IHN0ZXAubmV4dEJ0blRpdGxlIHx8ICdOZXh0JztcbiAgICBzdGVwLmVuZEJ0blRpdGxlID0gc3RlcC5lbmRCdG5UaXRsZSB8fCAnRW5kJztcblxuICAgIC8vIFNjcm9sbCB0aGUgdG91ciB3aW5kb3cgaW50byB2aWV3IGFmdGVyIG5nYlBvcG92ZXIgaXMgb3BlbmVkXG4gICAgdGhpcy5wb3BvdmVyRGlyZWN0aXZlLnNob3duLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXN0ZXAucHJldmVudFNjcm9sbGluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnc2Nyb2xsaW5nIGludG8gdmlldycsIHRoaXMudG91cldpbmRvdyk7XG4gICAgICAgICg8SFRNTEVsZW1lbnQ+dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ3N0YXJ0JyB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE9wZW4gdGhlIHRvdXIgd2luZG93XG4gICAgdGhpcy5wb3BvdmVyRGlyZWN0aXZlLm9wZW4oeyBzdGVwIH0pO1xuXG4gICAgLy8gU2V0IGEgYmFja2Ryb3AgdGhhdCBoaWdobGlnaHRzIHRoZSB0b3VyIGFuY2hvciBlbGVtZW50IG9yIGEgY3VzdG9tIGlucHV0IGVsZW1lbnRcbiAgICBpZiAoc3RlcC5lbmFibGVCYWNrZHJvcCkge1xuICAgICAgdGhpcy50b3VyQmFja2Ryb3Auc2hvdyh0aGlzLmVsZW1lbnQpO1xuICAgICAgLy8gQWRqdXN0IHRoZSBiYWNrZHJvcCBwb3NpdGlvbiBvbiBzY3JvbGxcbiAgICAgIGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKS5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy50b3VyU2VydmljZS5zdGVwSGlkZSQpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudG91ckJhY2tkcm9wLmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy50b3VyQmFja2Ryb3Auc2hvdyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICB9KVxuICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b3VyQmFja2Ryb3AuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGlkZVRvdXJTdGVwKCk6IHZvaWQge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnBvcG92ZXJEaXJlY3RpdmUuY2xvc2UoKTtcbiAgICBpZiAodGhpcy50b3VyU2VydmljZS5nZXRTdGF0dXMoKSA9PT0gVG91clN0YXRlLk9GRikge1xuICAgICAgdGhpcy50b3VyQmFja2Ryb3AuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==