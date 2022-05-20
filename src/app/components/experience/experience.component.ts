import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/data/Experience';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  //Creo lista (instancia de Interface):
  experienceList:Experience[]=[];
  //Variable para saber si estoy loggeado:
  isUserLogged: Boolean = false;
  //Formulario para ediciones:
  experienceForm: FormGroup;


    //Injecto servicio en el constructor, creando instancias de Servicios
    constructor(private datosPortfolio:PortfolioService,
      private authService:AuthService,
      private formBuilder:FormBuilder) { 

        this.experienceForm = this.formBuilder.group({
          expId: [''],
          company: ['', [Validators.required]],
          position: ['', [Validators.required]],
          startYear: ['', [Validators.required]],
          endYear: ['', [Validators.required]],
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
      this.datosPortfolio.obtenerDatosExperiencia().subscribe(
        datos =>{
          this.experienceList=datos;
          //console.log(datos);  
      });
    }

  //Métodos para edición con formularios:

  //Limpieza de Formulario:
  private clearForm(){
    this.experienceForm.setValue(
      {expId:'',
      company:'',
      position:'',
      startYear:0,
      endYear:0,}
    )
  }

  //Carga de formulario para edicion:
  private loadForm(experience: Experience){
    this.experienceForm.setValue(
      {expId:experience.expId,
      company:experience.company,
      position:experience.position,
      startYear:experience.startYear,
      endYear:experience.endYear,}
    )
  }

  //Para NUEVA experience, limpia el formulario.
  onNewExperience() {
    this.clearForm();
  }

  //Para MODIFICAR experience, precarga el formulario.
  onEditExperience(index: number) {
    let experience: Experience = this.experienceList[index];
    this.loadForm(experience);
  }

  //Para BORRAR experience.
  onDeleteExperience(index: number) {
    let experience: Experience = this.experienceList[index];
    if (confirm("¿Desea borrar experiencia?")) {
      this.datosPortfolio.borrarExperiencia(experience.expId).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
    alert("Eliminó un item de la lista de Experiencia");
  }

  //Metodo para Envio de formulario(confirmacion):
  onSubmit() {

    let experience: Experience = this.experienceForm.value;
    
   
    if (this.experienceForm.get('expId')?.value == '') {
      this.datosPortfolio.guardarNuevaExperiencia(experience).subscribe(
        (newExperience: Experience) => {
          this.experienceList.push(newExperience);
        }
      );
      alert("Agregó un nuevo item a la lista de Experiencia");
    } else {
      this.datosPortfolio.modificarExperiencia(experience).subscribe(
        () => {
          this.reloadData();
        }
      )
      alert("Modificó un item de la lista de Experiencia");
    }

  }

}


