import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicoListComponent } from './topico-list';

describe('TopicoList', () => {
  let component: TopicoListComponent;
  let fixture: ComponentFixture<TopicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
