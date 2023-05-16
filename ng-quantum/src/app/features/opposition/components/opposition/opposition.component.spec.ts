import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppositionComponent } from './opposition.component';

describe('OppositionComponent', () => {
  let component: OppositionComponent;
  let fixture: ComponentFixture<OppositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OppositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OppositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
