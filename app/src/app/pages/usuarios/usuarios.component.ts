import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios : Usuario[] = [];

  constructor(
    private usuario:UsuarioService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.GetUsuarios();
  }

  GetUsuarios(){

   this.usuario.GetUsuarios()
   .subscribe( resp =>{
    console.log(resp)
   });

  }

}
