import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeChequierComponent } from './commande-chequier.component';

describe('CommandeChequierComponent', () => {
  let component: CommandeChequierComponent;
  let fixture: ComponentFixture<CommandeChequierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeChequierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeChequierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
