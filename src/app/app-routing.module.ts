import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'classe-detail/:id',
    loadChildren: () => import('./pages/classe-detail/classe-detail.module').then( m => m.ClasseDetailPageModule)
  },
  {
    path: 'etudiant-detail/:id',
    loadChildren: () => import('./pages/etudiant-detail/etudiant-detail.module').then( m => m.EtudiantDetailPageModule)
  },
  {
    path: 'ajouter-classe',
    loadChildren: () => import('./pages/ajouter-classe/ajouter-classe.module').then( m => m.AjouterClassePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
