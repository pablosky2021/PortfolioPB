import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Creo un formulario
  formAuth: FormGroup;
  loginError: Boolean = false;

  //Injecto FormBuilder
  constructor(
              private formBuilder:FormBuilder,
              private authService: AuthService,
              private router: Router,) { 

    //Inicializo formulario y valido campos
    this.formAuth=this.formBuilder.group(
      {
        
        email:["",[Validators.required,Validators.email]],
        password:["",[Validators.required,Validators.minLength(4)]],

      }
    );
  }
  
  ngOnInit(): void {
  }


  onSubmit(event: Event) {
    event.preventDefault;

    this.authService.login(this.formAuth.value).subscribe(
      (response: Boolean) => {
        if (response)
          this.router.navigate(['/portfolio']);
        else
          this.loginError = true;
      }
    );
    
    
  }

  //Metodos para obtener email y pass
  get Email(){
    return this.formAuth.get("email");
  }
  
  get Password(){
    return this.formAuth.get("password");
  }





}
