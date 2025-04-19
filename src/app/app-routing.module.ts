import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'summary', component: SummaryComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: '**', redirectTo: '/register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
