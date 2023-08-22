import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBeneficiaireComponent } from './ajout-beneficiaire.component';

describe('AjoutBeneficiaireComponent', () => {
  let component: AjoutBeneficiaireComponent;
  let fixture: ComponentFixture<AjoutBeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutBeneficiaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
