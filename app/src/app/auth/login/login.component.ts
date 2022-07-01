import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: ['mattensohn64@gmail.com' || '', [Validators.required,Validators.email]] || '',  
    password: ['123456' || '', [Validators.required]] || ''
  })

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }


  Login(){

    const formulario = {email:this.loginForm.value.email || '',
    password:this.loginForm.value.password || ''};

    console.log(this.loginForm);

    this.auth.Login(formulario)
    .subscribe( auth =>{
      console.log(auth)
      if(!auth.estado){
       this.router.navigate(['usuarios']);
      }else{
        console.log("Usuario Eliminado");
      }
   
    })

  }

}
