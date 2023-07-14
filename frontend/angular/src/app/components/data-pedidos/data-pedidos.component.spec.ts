import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPedidosComponent } from './data-pedidos.component';

describe('DataPedidosComponent', () => {
  let component: DataPedidosComponent;
  let fixture: ComponentFixture<DataPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
