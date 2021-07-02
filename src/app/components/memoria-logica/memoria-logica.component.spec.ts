import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaLogicaComponent } from './memoria-logica.component';

describe('MemoriaLogicaComponent', () => {
  let component: MemoriaLogicaComponent;
  let fixture: ComponentFixture<MemoriaLogicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoriaLogicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriaLogicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
