import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarPage } from './cadastrar.page';

describe('CadastrarPage', () => {
  let component: CadastrarPage;
  let fixture: ComponentFixture<CadastrarPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CadastrarPage],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(CadastrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
