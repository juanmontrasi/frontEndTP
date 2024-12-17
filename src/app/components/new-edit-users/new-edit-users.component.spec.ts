import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditUsersComponent } from './new-edit-users.component';

describe('NewEditUsersComponent', () => {
  let component: NewEditUsersComponent;
  let fixture: ComponentFixture<NewEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEditUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
