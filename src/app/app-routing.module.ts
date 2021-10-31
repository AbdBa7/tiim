import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { ListEltComponent } from './list-elt/list-elt.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MergeRequestComponent } from './merge_request/merge_request.component';
// import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RandomGuard } from './auth/guards/random.guard';
import { AddTiimDataComponent } from './add-tiim-data/add-tiim-data.component';

const routes: Routes = [
  { path: 'root-component', component: AppComponent, canActivate: [RandomGuard], canLoad: [RandomGuard] },
  { path: '', component: ListEltComponent, canActivate: [RandomGuard], canLoad: [RandomGuard]},
  { path: 'details', component: DetailsComponent, data: {}, canActivate: [RandomGuard], canLoad: [RandomGuard] },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'merge-request', component: MergeRequestComponent },
  { path: 'add_tiim_data', component: AddTiimDataComponent, canActivate: [RandomGuard], canLoad: [RandomGuard] },

  // { path:'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }

  ];

// configures NgModule imports and exports 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
