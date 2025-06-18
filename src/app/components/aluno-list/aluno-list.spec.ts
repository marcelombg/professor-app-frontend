import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoListComponent } from './aluno-list';

describe('AlunoList', () => {
  let component: AlunoListComponent;
  let fixture: ComponentFixture<AlunoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
