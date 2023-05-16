import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequierDemandeListeComponent } from './chequier-demande-liste.component';

describe('ChequierDemandeListeComponent', () => {
  let component: ChequierDemandeListeComponent;
  let fixture: ComponentFixture<ChequierDemandeListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequierDemandeListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequierDemandeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
