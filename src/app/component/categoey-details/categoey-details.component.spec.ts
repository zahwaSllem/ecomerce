import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoeyDetailsComponent } from './categoey-details.component';

describe('CategoeyDetailsComponent', () => {
  let component: CategoeyDetailsComponent;
  let fixture: ComponentFixture<CategoeyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoeyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
