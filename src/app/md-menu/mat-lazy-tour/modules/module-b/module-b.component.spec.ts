import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModuleBComponent } from './module-b.component';

describe('ModuleBComponent', () => {
  let component: ModuleBComponent;
  let fixture: ComponentFixture<ModuleBComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
