import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/data/Persona';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  //Creo lista (instancia de Interface):
  personaList:Persona[]=[];
  //Variable para saber si estoy loggeado:
  isUserLogged: Boolean = false;
  //Formulario para ediciones:
  personaForm: FormGroup;



  //Injecto servicio en el constructor, creando instancias de Servicios
  constructor(private datosPortfolio:PortfolioService,
              private authService:AuthService,
              private formBuilder:FormBuilder) { 

                this.personaForm = this.formBuilder.group({
                  id: [''],
                  nombre: ['', [Validators.required]],
                  apellido: ['', [Validators.required]],
                  title1: ['', [Validators.required]],
                  title2: ['', [Validators.required]],
                  about: ['', [Validators.required]]
                });


              }


  //Metodos al inicio
  ngOnInit(): void {

    //Verificacion de loggeo:
    this.isUserLogged = this.authService.isUserLogged();

    //Carga de datos:
    this.reloadData();
    
  }

  //Metodo para Carga de datos:
    private reloadData() {
      this.datosPortfolio.obtenerDatosPersona().subscribe(
        datos =>{
          this.personaList=datos;
          //console.log(datos);  
      });
    }

  //Métodos para edición con formularios:

  //Carga de formulario para edicion:
  private loadForm(persona: Persona){
    this.personaForm.setValue(
      {id:persona.id,
      nombre:persona.nombre,
      apellido:persona.apellido,
      title1:persona.title1,
      title2:persona.title2,
      about:persona.about}
    )
  }

  //Para MODIFICAR persona, precarga el formulario.
  onEditPersona(index: number) {
    let persona: Persona = this.personaList[index];
    //console.log(persona);
    this.loadForm(persona);
  }

  //Metodo para Envio de formulario(confirmacion):
  onSubmit() {

    let persona: Persona = this.personaForm.value;
  
    
    this.datosPortfolio.modificarPersona(persona).subscribe(
        () => {
          this.reloadData();
        }
    )

    alert("Modificó los datos de la Persona");

  }

 


}

