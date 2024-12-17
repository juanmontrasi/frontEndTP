import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditProductsComponent } from './new-edit-products.component';

describe('NewEditUsersComponent', () => {
  let component: NewEditProductsComponent;
  let fixture: ComponentFixture<NewEditProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEditProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
