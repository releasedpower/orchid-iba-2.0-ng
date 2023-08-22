import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueOppositionComponent } from './historique-opposition.component';

describe('HistoriqueOppositionComponent', () => {
  let component: HistoriqueOppositionComponent;
  let fixture: ComponentFixture<HistoriqueOppositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueOppositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueOppositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
