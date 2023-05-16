import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireNouveauComponent } from './beneficiaire-nouveau.component';

describe('BeneficiaireNouveauComponent', () => {
  let component: BeneficiaireNouveauComponent;
  let fixture: ComponentFixture<BeneficiaireNouveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaireNouveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaireNouveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
