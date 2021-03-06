import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'rooms', component: LandingPageComponent},
  {path: 'contact', component: ContactComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
