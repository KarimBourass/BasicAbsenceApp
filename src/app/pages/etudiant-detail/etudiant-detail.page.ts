import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { Absence } from 'src/app/services/absence';

@Component({
  selector: 'app-etudiant-detail',
  templateUrl: './etudiant-detail.page.html',
  styleUrls: ['./etudiant-detail.page.scss'],
})
export class EtudiantDetailPage implements OnInit {

  Data: Absence[] = [];
  editForm: FormGroup;
  etudiant_id: any;

  constructor( private db: DbService,
    private router: Router,
    private toast: ToastController,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute) {

      this.etudiant_id = this.actRoute.snapshot.paramMap.get('id');
      
     }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){

        this.db.getAbsenceFromDbById(this.etudiant_id).then((res) => {
            this.db.fetchAbsencesById().subscribe(item => {
              this.Data = item
            })
        })

      }

    });  

    this.editForm = this.formBuilder.group({
      // nom_etudiant: [''],
      
    })
  }


  deleteAbsence(id,etudiant_id){
    this.db.deleteAbsence(id,etudiant_id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Absence supprimer',
        duration: 2500
      });
      toast.present();      
    })

  }

}
