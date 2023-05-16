import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequierDemandeComponent } from './chequier-demande.component';

describe('ChequierDemandeComponent', () => {
  let component: ChequierDemandeComponent;
  let fixture: ComponentFixture<ChequierDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequierDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequierDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
