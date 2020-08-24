import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtudiantDetailPage } from './etudiant-detail.page';

describe('EtudiantDetailPage', () => {
  let component: EtudiantDetailPage;
  let fixture: ComponentFixture<EtudiantDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtudiantDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
