import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';


//Configuro rutas para acceder a diferentes componentes
const routes: Routes = [

  {path: 'portfolio', component: PortfolioComponent },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/portfolio', pathMatch:'full' },
  {path: '**', redirectTo: '/portfolio'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
