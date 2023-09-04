import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirperListeComponent } from './virper-liste.component';

describe('VirperListeComponent', () => {
  let component: VirperListeComponent;
  let fixture: ComponentFixture<VirperListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirperListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirperListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
