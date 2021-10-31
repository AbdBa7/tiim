import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTiimDataComponent } from './add-tiim-data.component';

describe('AddTiimDataComponent', () => {
  let component: AddTiimDataComponent;
  let fixture: ComponentFixture<AddTiimDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTiimDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTiimDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
