import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';




/**
 * Shared services
 */
@Injectable()
export class SharedService {
  /**
   * Subject isLoading
   */
  private isLoadedEmittedSource = new Subject<boolean>();

  /**
   * Observable isLoading
   */
  isLoadingEmitted$ = this.isLoadedEmittedSource.asObservable();

  /**
   * Get isLoading state from the observable
   * @param state
   */
  emitIsLoaded(state: boolean){
    this.isLoadedEmittedSource.next(state);
  }

  search: EventEmitter<any> = new EventEmitter();

}

@Injectable()
export class SidenavService {
    private sidenav: MatSidenav;


    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
        this.sidenav.toggle();
   }
}

@Injectable()
export class Emitters{
  static authEmitter = new EventEmitter<boolean>();
}
