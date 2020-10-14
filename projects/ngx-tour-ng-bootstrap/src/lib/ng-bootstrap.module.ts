import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import {TourService} from 'ngx-tour-core';

import { NgbTourService } from './ng-bootstrap-tour.service';
import { TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective } from './tour-anchor.directive';
import { TourBackdropService } from './tour-backdrop.service';
import { TourStepTemplateComponent } from './tour-step-template.component';
import { TourStepTemplateService } from './tour-step-template.service';

export { TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective, TourStepTemplateComponent, NgbTourService };

@NgModule({
  declarations: [TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective, TourStepTemplateComponent],
  exports: [TourAnchorNgBootstrapDirective, TourAnchorNgBootstrapPopoverDirective, TourStepTemplateComponent],
  imports: [CommonModule, NgbPopoverModule],
})
export class TourNgBootstrapModule {
  public static forRoot(): ModuleWithProviders<TourNgBootstrapModule> {
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
