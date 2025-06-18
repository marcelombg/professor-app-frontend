import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprendizadoManagerComponent } from './aprendizado-manager'; 

describe('AprendizadoManagerComponent', () => { 
  let component: AprendizadoManagerComponent; 
  let fixture: ComponentFixture<AprendizadoManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprendizadoManagerComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprendizadoManagerComponent); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
