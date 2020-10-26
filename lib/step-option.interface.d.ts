import { IStepOption } from 'ngx-tour-core';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';
export interface INgbStepOption extends IStepOption {
    placement?: PlacementArray;
    /** Display a backdrop, highlighting the tour anchor element */
    enableBackdrop?: boolean;
    /** This step requires a user action (like clicking the tour anchor element), and does not display a next button */
    actionRequired?: boolean;
}
