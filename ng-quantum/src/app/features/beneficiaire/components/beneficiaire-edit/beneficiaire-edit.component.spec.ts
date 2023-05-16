import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireEditComponent } from './beneficiaire-edit.component';

describe('BeneficiaireEditComponent', () => {
  let component: BeneficiaireEditComponent;
  let fixture: ComponentFixture<BeneficiaireEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaireEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
