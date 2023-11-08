import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFaEmailComponent } from './two-fa-email.component';

describe('TwoFaEmailComponent', () => {
  let component: TwoFaEmailComponent;
  let fixture: ComponentFixture<TwoFaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFaEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
