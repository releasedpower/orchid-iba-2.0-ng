import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTwofactComponent } from './login-twofact.component';

describe('LoginTwofactComponent', () => {
  let component: LoginTwofactComponent;
  let fixture: ComponentFixture<LoginTwofactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTwofactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTwofactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
