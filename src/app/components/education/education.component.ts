import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/data/Education';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  //Creo lista (instancia de Interface):
  educationList:Education[]=[];
  //Variable para saber si estoy loggeado:
  isUserLogged: Boolean = false;
  //Formulario para ediciones:
  educationForm: FormGroup;



  //Injecto servicio en el constructor, creando instancias de Servicios
  constructor(private datosPortfolio:PortfolioService,
              private authService:AuthService,
              private formBuilder:FormBuilder) { 

                this.educationForm = this.formBuilder.group({
                  eduId: [''],
                  school: ['', [Validators.required]],
                  title: ['', [Validators.required]],
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
      this.datosPortfolio.obtenerDatosEducacion().subscribe(
        datos =>{
          this.educationList=datos;
          //console.log(datos);  
      });
    }

  //Métodos para edición con formularios:

  //Limpieza de Formulario:
  private clearForm(){
    this.educationForm.setValue(
      {eduId:'',
      school:'',
      title:'',
      startYear:0,
      endYear:0,}
    )
  }

  //Carga de formulario para edicion:
  private loadForm(education: Education){
    this.educationForm.setValue(
      {eduId:education.eduId,
      school:education.school,
      title:education.title,
      startYear:education.startYear,
      endYear:education.endYear,}
    )
  }

  //Para NUEVA education, limpia el formulario.
  onNewEducation() {
    this.clearForm();
  }

  //Para MODIFICAR education, precarga el formulario.
  onEditEducation(index: number) {
    let education: Education = this.educationList[index];
    this.loadForm(education);
  }

  //Para BORRAR education.
  onDeleteEducation(index: number) {
    let education: Education = this.educationList[index];
    if (confirm("¿Desea borrar educación?")) {
      this.datosPortfolio.borrarEducacion(education.eduId).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
    alert("Eliminó un item de la lista de Educación");
  }

  //Metodo para Envio de formulario(confirmacion):
  onSubmit() {

    let education: Education = this.educationForm.value;
    
    if (this.educationForm.get('eduId')?.value == '') {
      this.datosPortfolio.guardarNuevaEducacion(education).subscribe(
        (newEducation: Education) => {
          this.educationList.push(newEducation);
        }
      );
      alert("Agregó un nuevo item a la lista de Educación");
    } else {
      this.datosPortfolio.modificarEducacion(education).subscribe(
        () => {
          this.reloadData();
        }
      )
      alert("Modificó un item de la lista de Educación");
    }

  }

}

