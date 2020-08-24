//home.page.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Classe } from '../services/classe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  mainForm: FormGroup;
  Data: Classe[] = []

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }


  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchClasses().subscribe(item => {
          this.Data = item
        })
      }
    });

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

  deleteClasse(id){
    this.db.deleteClasse(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Classe deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
   
}