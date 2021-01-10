import { TourHotkeyListenerComponent } from 'ngx-tour-core';
import { TourStepTemplateService } from './tour-step-template.service';
import { Component, TemplateRef, ViewChild, ViewEncapsulation, Input, ContentChild } from '@angular/core';
import { NgbTourService } from './ng-bootstrap-tour.service';
export class TourStepTemplateComponent extends TourHotkeyListenerComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ci1zdGVwLXRlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdG91ci1uZy1ib290c3RyYXAvc3JjLyIsInNvdXJjZXMiOlsibGliL3RvdXItc3RlcC10ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLDJCQUEyQixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsS0FBSyxFQUNMLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUE4QjdELE1BQU0sT0FBTyx5QkFBMEIsU0FBUSwyQkFBMkI7SUFXeEUsWUFDVSx1QkFBZ0QsRUFDakQsV0FBMkI7UUFFbEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBSFgsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNqRCxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7SUFHcEMsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUTtZQUNuQyxJQUFJLENBQUMsWUFBWTtnQkFDakIsSUFBSSxDQUFDLG1CQUFtQjtnQkFDeEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ2pDLENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7YUFDRjs7O1lBdkNRLHVCQUF1QjtZQVV2QixjQUFjOzs7c0NBZ0NwQixTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzJCQUd6RCxLQUFLO2tDQUdMLFlBQVksU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG91ckhvdGtleUxpc3RlbmVyQ29tcG9uZW50LCBJU3RlcE9wdGlvbiB9IGZyb20gJ25neC10b3VyLWNvcmUnO1xuaW1wb3J0IHsgVG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3RvdXItc3RlcC10ZW1wbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JUb3VyU2VydmljZSB9IGZyb20gJy4vbmctYm9vdHN0cmFwLXRvdXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ3RvdXItc3RlcC10ZW1wbGF0ZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICN0b3VyU3RlcCBsZXQtc3RlcD1cInN0ZXBcIj5cbiAgICAgIDxwIGNsYXNzPVwidG91ci1zdGVwLWNvbnRlbnRcIj57eyBzdGVwPy5jb250ZW50IH19PC9wPlxuICAgICAgPGRpdiBjbGFzcz1cInRvdXItc3RlcC1uYXZpZ2F0aW9uXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAqbmdJZj1cInRvdXJTZXJ2aWNlLmhhc1ByZXYoc3RlcClcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvdXJTZXJ2aWNlLnByZXYoKVwiXG4gICAgICAgID5cbiAgICAgICAgICDCqyB7eyBzdGVwPy5wcmV2QnRuVGl0bGUgfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAqbmdJZj1cInRvdXJTZXJ2aWNlLmhhc05leHQoc3RlcClcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvdXJTZXJ2aWNlLm5leHQoKVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBzdGVwPy5uZXh0QnRuVGl0bGUgfX0gwrtcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cInRvdXJTZXJ2aWNlLmVuZCgpXCI+XG4gICAgICAgICAge3sgc3RlcD8uZW5kQnRuVGl0bGUgfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRvdXJTdGVwVGVtcGxhdGVDb21wb25lbnQgZXh0ZW5kcyBUb3VySG90a2V5TGlzdGVuZXJDb21wb25lbnRcbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQFZpZXdDaGlsZCgndG91clN0ZXAnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIGRlZmF1bHRUb3VyU3RlcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzdGVwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPHsgc3RlcDogSVN0ZXBPcHRpb24gfT47XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZilcbiAgcHVibGljIHN0ZXBUZW1wbGF0ZUNvbnRlbnQ6IFRlbXBsYXRlUmVmPHsgc3RlcDogSVN0ZXBPcHRpb24gfT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b3VyU3RlcFRlbXBsYXRlU2VydmljZTogVG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UsXG4gICAgcHVibGljIHRvdXJTZXJ2aWNlOiBOZ2JUb3VyU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0b3VyU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudG91clN0ZXBUZW1wbGF0ZVNlcnZpY2UudGVtcGxhdGUgPVxuICAgICAgdGhpcy5zdGVwVGVtcGxhdGUgfHxcbiAgICAgIHRoaXMuc3RlcFRlbXBsYXRlQ29udGVudCB8fFxuICAgICAgdGhpcy5kZWZhdWx0VG91clN0ZXBUZW1wbGF0ZTtcbiAgfVxufVxuIl19