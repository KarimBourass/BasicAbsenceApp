// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, identity } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Classe } from './classe';
import { Etudiant } from './etudiant';
import { Absence } from './absence';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  classesList = new BehaviorSubject([]);
  EtudiantList = new BehaviorSubject([]);
  absenceList = new BehaviorSubject([]);
  EtudiantListByid  = new BehaviorSubject([]);
  absenceListByid  = new BehaviorSubject([]);

  classeListByid  = new BehaviorSubject([]);


  constructor(private platform: Platform, private sqlite: SQLite, 
    private httpClient: HttpClient, private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'gestion_abs.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

   // Render fake data
   getFakeData() {
    this.httpClient.get('assets/dump.sql', {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getClassesFromDb();
          this.getEtudiantsFromDb();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  
  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchClasses(): Observable<Classe[]> {
    return this.classesList.asObservable();
  }

  fetchEtudiants(): Observable<Etudiant[]> {
    return this.EtudiantList.asObservable();
  }
  
  fetchEtudiantsById(): Observable<Etudiant[]> {
    return this.EtudiantListByid.asObservable();
  }

  fetchAbsencesById(): Observable<Absence[]> {
    return this.absenceListByid.asObservable();
  }

  fetchClasseById(): Observable<Classe[]> {
    return this.classeListByid.asObservable();
  }

   

  // Get list
  getClassesFromDb(){
    return this.storage.executeSql("SELECT * FROM classe", []).then(res => {
      let items: Classe[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nom_classe: res.rows.item(i).nom_classe,  
           });
        }
      }
      this.classesList.next(items);
    });
  }

  // Get list
  getEtudiantsFromDb(){
    return this.storage.executeSql("SELECT * FROM etudiant", []).then(res => {
      let items: Etudiant[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nom_etudiant: res.rows.item(i).nom_etudiant,
          });
        }
      }
      this.EtudiantList.next(items);
    });
  }

  // Get list
  getAbsenceFromDb(){
    return this.storage.executeSql("SELECT * FROM absence", []).then(res => {
      let items: Absence[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            date: res.rows.item(i).date,
            observation: res.rows.item(i).observation,
            etudiant_id: res.rows.item(i).etudiant_id,
          });
        }
      }
      this.absenceList.next(items);
    });
  }

  // Get list by id
  getEtudiantsFromDbById(id){
    return this.storage.executeSql("SELECT * FROM etudiant WHERE classe_id = ?", [id]) .then(res => {
      let items: Etudiant[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nom_etudiant: res.rows.item(i).nom_etudiant,
          });
        }
      }
      this.EtudiantListByid.next(items);
    });
  }

  getAbsenceFromDbById(id){
    return this.storage.executeSql("SELECT * FROM absence WHERE etudiant_id = ?", [id]) .then(res => {
      let items: Absence[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            date: res.rows.item(i).date,
            observation: res.rows.item(i).observation,
            etudiant_id: res.rows.item(i).etudiant_id,
          });
        }
      }
      this.absenceListByid.next(items);
    });
  }

  // Pour obtenir une classe par son id
  getClasseFromDbById(id){
    return this.storage.executeSql("SELECT * FROM classe WHERE id = ?", [id]) .then(res => {
      return {
        id: res.id,
        nom_classe: res.nom_classe,  
      }
    });
  }

  
  // Add Classe
  addClasse(nom_classe) {
    let data = [nom_classe];
    return this.storage.executeSql('INSERT INTO classe (nom_classe) VALUES (?)', data)
    .then(res => {
      this.getClassesFromDb();
    });
  }

   // Add ETD
   addEtudiant(nom_etudiant,classe_id) {
    let data = [nom_etudiant,classe_id];
    return this.storage.executeSql('INSERT INTO etudiant (nom_etudiant,classe_id) VALUES (?,?)', data)
    .then(res => {
      this.getEtudiantsFromDbById(classe_id);
    });
  }
 
  // Get single object
  getClasseName(id): Promise<Classe> {
    return this.storage.executeSql("SELECT * FROM classe WHERE id = ?", [id]).then(res => { 
      return {
        id: res.rows.res(0).id,
        nom_classe: res.rows.res(0).nom_classe,  
      }
      
    });
  }
    
  // Update
  updateClasse(id, song: Classe) {
    let data = [song.nom_classe];
    return this.storage.executeSql(`UPDATE classe SET nom_classe = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getClassesFromDb();
    })
  }

  // Delete
  deleteClasse(id) {
    return this.storage.executeSql('DELETE FROM classe WHERE id = ?', [id])
    .then(_ => {
      this.getClassesFromDb();
    });
  }

  deleteEtudiant(id,classe_id){
    return this.storage.executeSql('DELETE FROM etudiant WHERE id = ?', [id])
    .then(_ => {
       this.getEtudiantsFromDbById(classe_id);
    });
  }

  // Delete absence
  deleteAbsence(id,etudiant_id){
    return this.storage.executeSql('DELETE FROM absence WHERE id = ?', [id])
    .then(_ => {
       this.getAbsenceFromDbById(etudiant_id);
    });

  }

  
}