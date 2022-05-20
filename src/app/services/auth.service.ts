import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject,} from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginDto } from '../data/LoginDto';
import { config } from '../data/config/Config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //Creo URL de la API

  //Creo Observable de Behavior Subject

  constructor(private http:HttpClient) { }

  
  //Se nombra DTO=Objeto que agrupa y transfiere datos
  public login(credentials:LoginDto):Observable<Boolean> {
    
    return this.http.post<Boolean>(config.baseUrl + "login", credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "pablo");  
      })
    );

  }

  //Metodo para...
  public logout() {
    sessionStorage.removeItem("user");
  }

  //Metodo para...
  public isUserLogged():boolean {
    return sessionStorage.getItem("user") !== null;
  }







}
