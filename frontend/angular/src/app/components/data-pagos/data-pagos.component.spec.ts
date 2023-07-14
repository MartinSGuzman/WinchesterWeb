import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPagosComponent } from './data-pagos.component';

describe('DataPagosComponent', () => {
  let component: DataPagosComponent;
  let fixture: ComponentFixture<DataPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
