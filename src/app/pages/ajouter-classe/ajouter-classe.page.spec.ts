import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterClassePage } from './ajouter-classe.page';

describe('AjouterClassePage', () => {
  let component: AjouterClassePage;
  let fixture: ComponentFixture<AjouterClassePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterClassePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterClassePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
