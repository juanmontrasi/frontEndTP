import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdClientComponent } from './prod-client.component';

describe('ProdClientComponent', () => {
  let component: ProdClientComponent;
  let fixture: ComponentFixture<ProdClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
