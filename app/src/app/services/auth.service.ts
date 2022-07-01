import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  Login(formData: LoginForm){

    return this.http.post(`${base_url}/auth/login`,formData)
          .pipe(
            tap((resp:any) =>{
                localStorage.setItem('token',resp.token);
            })
          );

  }
}
