import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public formSubmit = false;

  public usuarios : Usuario[] = [];
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = true;
  
  public userForm = this.fb.group({
    id:[''],
    nombre:  ['',[Validators.required]] || '',
    paterno: ['',[Validators.required]] || '',
    materno: ['',[Validators.required]] || '',
    email: ['', [Validators.required,Validators.email]] || '',  
    password: [ '', [Validators.required]] || ''
  })

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  

  constructor(
    private usuario:UsuarioService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.GetUsuarios();
  }

  GetUsuarios(){

   this.usuario.GetUsuarios()
   .subscribe( uruarios =>{
    this.usuarios = uruarios;
   });

  }

  campoNoValido(campo:string):boolean{
    if(this.userForm.get(campo)?.invalid && this.formSubmit){
      return true;
    }else{
      return false;
    }
    
  }

  CrearUsuario(){

    this.formSubmit = true;
    console.log(this.userForm.controls);
    if(this.userForm.status == 'VALID' && this.userForm.get('email')?.valid){
      this.usuario.CreaUsuario(this.userForm.value)
    .subscribe( usuario =>{
      this.Toast.fire({
        icon: 'success',
        title: 'Usuario Creadio Exitosamente'
      })
    });
    console.log("hola");
    }
  

  }

  EditarUser(usuario:Usuario){

    this.ocultarEditar = true;
    this.ocultarRegistro = false;

    this.userForm = this.fb.group({
      id: usuario.usuario_id,
      nombre:  usuario.nombre,
      paterno: usuario.paterno,
      materno: usuario.materno,
      email: usuario.email
    })
  
  

  }

  Editar(){

    console.log(this.userForm.value);

    this.ocultarEditar = false;
    this.ocultarRegistro = true;

    this.usuario.EditaUsuario(this.userForm.value.id,this.userForm.value)
    .subscribe(usuario =>{
        this.GetUsuarios();
    });
  }

  EliminarUser(id:number){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Registro a sido eliminado.',
          'success'
        )

        
    this.usuario.EliminaUsuario(id)
    .subscribe( usuario  =>{
      
      this.GetUsuarios();
    })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Canelado',
          'Se ha cancelado',
          'error'
        )
      }
    })

  }

}
