import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTraduccionComponent } from './tabla-traduccion.component';

describe('ProcesosMemoriaComponent', () => {
  let component: TablaTraduccionComponent;
  let fixture: ComponentFixture<TablaTraduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTraduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTraduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
