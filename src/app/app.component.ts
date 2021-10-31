import { Component, ViewChild, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from './service/service-common';
import { SidenavService } from './service/service-shared';
import { NONE_TYPE } from '@angular/compiler';
import { TimelineItem } from 'ngx-vertical-timeline';
import { AboutComponent } from './about/about.component';
import { ListEltComponent } from './list-elt/list-elt.component';
import { Emitters } from './service/service-shared';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    { provide: MatDialogRef, useValue: {} }, ListEltComponent
    // ...
  ]
})
export class AppComponent implements OnInit {
  /**
   * HTML access of side (left compute modues shortcuts menu)
   */
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @Output() filter_emit = new EventEmitter();
  activatedRoute: any;
  
  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private common_service: CommonService,
    private sidenavService: SidenavService,
    private dialog: MatDialog,
    public about_dialog: MatDialogRef<AboutComponent>,
    public authService: AuthService
  ) { }

  CurrentUser: any;
  id = null;
  status: any;
  title = "StarTech";
  panels: any;
  panelOpenState = false;

  arry_data : Array<any> = [];
  items: TimelineItem[] = [];
  message: any;

  ngOnInit(): void {
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
        width: "50%", height: '100%',
        data: { errorcode: "errorCode", errormessage: "errorMessage" }
      });
  }

  /**
   * Get the connected current user
  */
  getUser() {
    /*
    this.http.get('http://localhost:8000/api/user', {withCredentials: true})
    this.common_service.get(`${environment.API_URL}login?email=kundugu@gmail.com&password=aspire`)
    .subscribe(
      (res: any) => {
        this.message = 'Hi ${res.name}';
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in!';
        Emitters.authEmitter.emit(false);
      }
    );*/
  }
  onGetDetails(item: any) {
    console.log(item);
  }
  public detail_component(events: any): void {
    /* todo (exploit later): this.data = this.route.snaphsot.data['dataFromResolver'];
    Not good:
    const data = events.subscribe(res => {
      console.log(res);
    });
    console.log('Received in parent', data); */

    console.log('Received in 1', events);

    if (events['all_cate']) {
      this.id = null;
    }
    if ( events.route ) {
      events.route.params.subscribe((detail: { [x: string]: null; }) => {
        console.log('Received in 5', detail['id']);
        this.id = detail['id'];
      });
    }

  }
  // AuthService
  logout() {
    // remove user from local storage to log user out
    if (this.authService.isLoggedIn()){
      this.authService.logout()
      this.common_service.get(`${environment.API_URL}logout`, {withCredentials: true})
      localStorage.removeItem('JWT_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
    }
    
    this.router.navigate(['/login'])

  }

}
