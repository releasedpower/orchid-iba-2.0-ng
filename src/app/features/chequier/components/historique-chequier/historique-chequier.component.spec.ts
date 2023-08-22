import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueChequierComponent } from './historique-chequier.component';

describe('HistoriqueChequierComponent', () => {
  let component: HistoriqueChequierComponent;
  let fixture: ComponentFixture<HistoriqueChequierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueChequierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueChequierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
