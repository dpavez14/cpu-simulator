import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaProcesosComponent } from './cola-procesos.component';

describe('ColaProcesosComponent', () => {
  let component: ColaProcesosComponent;
  let fixture: ComponentFixture<ColaProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaProcesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
