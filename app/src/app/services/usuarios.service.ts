import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario, FetchAllResponse } from '../interfaces/usuario.interfaces';


import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  constructor(
    private http:HttpClient
  ) { }



  GetUsuarios(): Observable<Usuario[]>{

    return this.http.get<FetchAllResponse>(`${base_url}/usuarios`)
    .pipe(
      map(this.transform)
    );

  }


  private transform( resp: FetchAllResponse ) {

    const UsuarioList: Usuario[] = resp.usuarios.map( usuarios => {
 

     return{
      usuario_id: usuarios.usuario_id,
      nombre: usuarios.nombre,
      paterno: usuarios.paterno,
      materno: usuarios.materno,
      email: usuarios.email,
      estado: usuarios.estado
     }
    })

   
    return UsuarioList;
  }

  EliminaUsuario(id:number){
    return this.http.delete(`${base_url}/usuarios/${id}`);
 }

 CreaUsuario(Usuario:object){
   return this.http.post(`${base_url}/usuarios/`,Usuario);
 }

 EditaUsuario(id:number,Usuario:object){
   return this.http.put(`${base_url}/usuarios/${id}`,Usuario);
}

}
