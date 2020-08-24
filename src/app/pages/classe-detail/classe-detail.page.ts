import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { Etudiant } from 'src/app/services/etudiant';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.page.html',
  styleUrls: ['./classe-detail.page.scss'],
})
export class ClasseDetailPage implements OnInit {

  
  editForm: FormGroup;
  id: any;
  Data: Etudiant[] = [];
  nom_classe: string;
  classe_id: number;
  
  nom_etudiant: string;

  dbReady: boolean = false;
  

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private actRoute: ActivatedRoute
  ) {

    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.classe_id = this.id;
    
   }

  ngOnInit(){
    this.db.dbState().subscribe((res) => {
      if(res){

        this.db.getEtudiantsFromDbById(this.id).then((res) => {
            this.db.fetchEtudiantsById().subscribe(item => {
            this.Data = item
            })
        })
      }// end if

      
    });  

   

    this.editForm = this.formBuilder.group({
      nom_etudiant: [''],
      
    })
  }

  
  saveForm(){
    this.db.addEtudiant(this.editForm.value.nom_etudiant,this.classe_id).then((res) => {
      this.editForm.reset();
    })

  }

  deleteEtudiant(id,classe_id){
    this.db.deleteEtudiant(id,classe_id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Classe deleted',
        duration: 2500
      });
      toast.present();      
    })
    
  }
}
