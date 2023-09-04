import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementEditComponent } from './virement-edit.component';

describe('VirementEditComponent', () => {
  let component: VirementEditComponent;
  let fixture: ComponentFixture<VirementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirementEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
