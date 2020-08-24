import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Classe } from '../../services/classe';

@Component({
  selector: 'app-ajouter-classe',
  templateUrl: './ajouter-classe.page.html',
  styleUrls: ['./ajouter-classe.page.scss'],
})
export class AjouterClassePage implements OnInit {

  mainForm: FormGroup;

  constructor(    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router) { }

  ngOnInit() {

    this.mainForm = this.formBuilder.group({
      classe: ['']
    })
  }


  storeData() {
    this.db.addClasse(
      this.mainForm.value.classe,
    ).then((res) => {
      this.mainForm.reset();
    })
  }

}
