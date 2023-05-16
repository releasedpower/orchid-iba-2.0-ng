import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppositionListeComponent } from './opposition-liste.component';

describe('OppositionListeComponent', () => {
  let component: OppositionListeComponent;
  let fixture: ComponentFixture<OppositionListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OppositionListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OppositionListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
