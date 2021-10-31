/*
The MIT License

Copyright (c) 2010-2021 Google LLC. http://angular.io/license
*/

import { ModuleWithProviders, NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './service/service-common';
import { FilterPipe } from './filter.pipe';

/*  material  */
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';


import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

/*  Component  */
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MergeRequestComponent } from './merge_request/merge_request.component';
import { DetailsComponent } from './details/details.component';
import { ListEltComponent } from './list-elt/list-elt.component';
// import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LoginComponent } from './login/login.component';

/*  flex-layout  */
import {FlexLayoutModule} from "@angular/flex-layout";
import { AboutComponent } from './about/about.component';
import { SidenavService } from "./service/service-shared";
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { NgxVerticalTimelineModule } from 'ngx-vertical-timeline';
//import { NgVerticalTimelineModule  } from 'ng-vertical-timeline';
import { MglTimelineModule } from 'angular-mgl-timeline';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './auth.interceptor'
// import { AuthService } from "./service/auth_service";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/containers/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { RandomGuard } from './auth/guards/random.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { AddTiimDataComponent } from './add-tiim-data/add-tiim-data.component';
import { DatePipe } from '@angular/common';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

// We have to supply the plotly.js module to the Angular
// library.
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    MergeRequestComponent,
    DetailsComponent,
    ListEltComponent,
    AboutComponent,
    LoginComponent,
    AddTiimDataComponent,
    FilterPipe
    // RegisterComponent,
  ],
  imports: [
    PlotlyModule,
    MatRippleModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBadgeModule, MatIconModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule,
    MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatChipsModule,
    MatProgressSpinnerModule, MatRadioModule, MatTooltipModule, MatSelectModule, MatTabsModule, MatListModule,
    MatTreeModule, MatSidenavModule, MatSortModule, MatTableModule, MatSlideToggleModule, MatPaginatorModule,
    MatProgressBarModule, MatToolbarModule, MatExpansionModule,
    VerticalTimelineModule, NgxVerticalTimelineModule,
    FormsModule, ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    CommonModule,
    RouterModule,
  ],
  providers: [
    CommonService, SidenavService, DatePipe,
    AuthGuard, AuthService, RandomGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  //  providers: [CommonService, SidenavService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],

  entryComponents: [AboutComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
