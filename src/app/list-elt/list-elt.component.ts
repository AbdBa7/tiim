import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { AboutComponent } from '../about/about.component';
import { Router } from '@angular/router';
import { CommonService } from '../service/service-common';
import { SidenavService } from '../service/service-shared';
import { NONE_TYPE } from '@angular/compiler';
import { TimelineItem } from 'ngx-vertical-timeline';
import { Emitters } from '../service/service-shared';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-list-elt',
  templateUrl: './list-elt.component.html',
  styleUrls: ['./list-elt.component.scss'],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    // ...
  ]
})
export class ListEltComponent implements OnInit {
  /**
   * HTML access of side (left compute modues shortcuts menu)
   */
   @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  
   constructor(
     private common_service: CommonService,
     private router: Router,
     private sidenavService: SidenavService,
     private dialog: MatDialog,
     public about_dialog: MatDialogRef<AboutComponent>,
     public authService: AuthService,
     public datepipe: DatePipe
   ) { }
   environement = environment;
   CurrentUser: any;
   status: any;
   panels: any;
   panelOpenState = false;
   
 
   events : Array<any> = [];
   items: TimelineItem[] = [];
   message: any;
   data: any;
   data_set: any;
   searchText:''
   qt_gazoil: any;
   dates_data: any;
   cons_gasoil: any;
  
 
   ngOnInit(): void {
    this.get_all_data();
   }
 
   /**
    * Open feedback window
    */
 
   openFeedBack(){
     // window.open(this.environement.API_URL + 'api/FeedBack/user?path=' + location.href, 'FeedBack', 'toolbar=0, location=0, scrollbars=1, statusbar=1, menubar=0, resizable=1, height=520, width=1024')
   }
   
 
   ngAfterViewInit(): void {
     this.sidenavService.setSidenav(this.sidenav);
   }
 
   close(){
     this.sidenav.close();
   }
 
   toggle(pan: any){
     this.panels = pan
     this.sidenav.toggle()
   }

   getAbout(){
     this.about_dialog = this.dialog.open(AboutComponent, {
      width: "80%", height: '97%',
      data: { 
        "qt_gazoil": this.qt_gazoil, "cons_gasoil": this.cons_gasoil, "dates_data": this.dates_data,
        "quantit_tuyau_fabriquee": 4626,
        "quantite_tuyau_prevue": 4000,
        "quantite_tuyau_supplementaire": 626,

      }
    });
   }

  transform(items: any[], searchText: string): any[] {
    items = this.data;
    if (!items) { return []; }
    if (!searchText) { return items ; }

    searchText = searchText.toLowerCase();
    console.log('abc')
    if (typeof(items[0]) === 'string') {
      return items.filter( it => {
        return it.toLowerCase().includes(searchText);
      });
    };
    return items;
  };
   

  get_all_data() {
    this.common_service.get_all(`${environment.API_URL}get_all_tiim_items`)
    .subscribe((data: any) => {
      this.data = data["raw_data"];
      this.qt_gazoil = data["qt_gazoil"];
      this.cons_gasoil = data["cons_gasoil"];
      this.dates_data = data["dates_data"];
      

      var dates_data = new Array(); 
      for (var item of this.dates_data) {
        dates_data.push(this.datepipe.transform(item, 'dd/MM/yyyy')); 
      }
      this.dates_data = dates_data
      const self = this;
      
      for (item of this.data) {
        item["date"] = this.datepipe.transform(item["date"], 'dd/MM/yyyy')
        this.items.push({
          label: 'Plus de detail',
          icon: 'fa fa-calendar-plus-o',
          styleClass: "vertical_timelin",
          content: `${item["observations"]} ${item["date"]}`,
          title: item["date"],
          command() {
            self.router.navigate(['details'], {state: {data: item}});
          }
        });
      }
    })
  };
  

  // AuthService
  logout() {
    // remove user from local storage to log user out
    if (this.authService.isLoggedIn()){
      this.authService.logout()
      localStorage.removeItem('token');
    }
    
    this.router.navigate(['/login'])

  }
   /**
    * Get the connected current user
   
   getUser() {
     this.commonService.get(`${environement.API_USER_ENDPOINT}GetCurrentUser`)
     .subscribe(user => {
       this.CurrentUser = user;
       if {user.status = 112:
         this.status = 0;
       }
       else{
         this.status = 200;
       }
       console.log(this.CurrentUser)
     });
   }*/
 }

 