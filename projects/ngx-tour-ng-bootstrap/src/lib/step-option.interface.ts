import { IStepOption } from 'ngx-tour-core';
import { Placement } from '@ng-bootstrap/ng-bootstrap';

type StepPlacement = Placement | 'after' | 'after-top' | 'after-bottom' | 'top-after' | 'top-before' | 'bottom-after' | 'bottom-before' | 'before' | 'before-top' | 'before-bottom'| 'below' | 'above';

export interface INgbStepOption extends IStepOption {
    placement?: StepPlacement;
    enableBackdrop?: boolean;
}
