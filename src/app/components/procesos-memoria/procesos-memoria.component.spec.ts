import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosMemoriaComponent } from './procesos-memoria.component';

describe('ProcesosMemoriaComponent', () => {
  let component: ProcesosMemoriaComponent;
  let fixture: ComponentFixture<ProcesosMemoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesosMemoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesosMemoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
