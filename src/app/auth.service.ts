import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn: boolean = false
  redirectUrl: string

  login(name: string, password:string): Observable<boolean> {
    const isLoggedIn = (name == 'jeSuisLAlternant' && password == 'quIlTeFaut')

    return of(isLoggedIn).pipe(
      delay(1000),//simulation du delay serveur
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    )
  }

  logout() {
    this.isLoggedIn = false
  }
}
