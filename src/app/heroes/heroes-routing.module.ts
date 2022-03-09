import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CreateHeroPageComponent } from './components/create-hero-page/create-hero-page.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children : [
      { path: 'all-heroes', component: HeroesListComponent, canActivate: [AuthGuard] },
      { path: 'my-heroes', component: HeroesListComponent, canActivate: [AuthGuard] },
      { path: 'create-hero', component: CreateHeroPageComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HeroesRoutingModule { }