import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEltComponent } from './list-elt.component';

describe('ListEltComponent', () => {
  let component: ListEltComponent;
  let fixture: ComponentFixture<ListEltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
