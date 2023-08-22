import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppositionChequierComponent } from './opposition-chequier.component';

describe('OppositionChequierComponent', () => {
  let component: OppositionChequierComponent;
  let fixture: ComponentFixture<OppositionChequierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OppositionChequierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OppositionChequierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
