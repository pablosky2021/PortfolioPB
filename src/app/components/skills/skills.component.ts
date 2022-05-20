import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skills } from 'src/app/data/Skills';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  //Creo lista (instancia de Interface):
  skillsList:Skills[]=[];
  //Variable para saber si estoy loggeado:
  isUserLogged: Boolean = false;
  //Formulario para ediciones:
  skillsForm: FormGroup;
  
  colval: Number = 33;



  //Injecto servicio en el constructor, creando instancias de Servicios
  constructor(private datosPortfolio:PortfolioService,
              private authService:AuthService,
              private formBuilder:FormBuilder) { 
                
                this.skillsForm = this.formBuilder.group({
                  skillId: [''],
                  name: ['', [Validators.required]],
                  percent: ['', [Validators.required]],
                  image: ['', [Validators.required]],
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
      this.datosPortfolio.obtenerDatosHabilidad().subscribe(
        datos =>{
          this.skillsList=datos;
          //console.log(datos);  
      });
    }

  //Métodos para edición con formularios:

  //Limpieza de Formulario:
  private clearForm(){
    this.skillsForm.setValue(
      {skillId:'',
      name:'',
      percent:'',
      image:'',}
    )
  }

  //Carga de formulario para edicion:
  private loadForm(skills: Skills){
    this.skillsForm.setValue(
      {skillId:skills.skillId,
      name:skills.name,
      percent:skills.percent,
      image:skills.image,}
    )
  }

  //Para NUEVA skills, limpia el formulario.
  onNewSkills() {
    this.clearForm();
  }

  //Para MODIFICAR skills, precarga el formulario.
  onEditSkills(index: number) {
    let skills: Skills = this.skillsList[index];
    this.loadForm(skills);
  }

  //Para BORRAR skills.
  onDeleteSkills(index: number) {
    let skills: Skills = this.skillsList[index];
    if (confirm("¿Desea borrar habilidad?")) {
      this.datosPortfolio.borrarHabilidad(skills.skillId).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
    alert("Eliminó un item de la lista de Habilidades");
  }

  //Metodo para Envio de formulario(confirmacion):
  onSubmit() {

    let skills: Skills = this.skillsForm.value;
    
    if (this.skillsForm.get('skillId')?.value == '') {
      this.datosPortfolio.guardarNuevaHabilidad(skills).subscribe(
        (newSkills: Skills) => {
          this.skillsList.push(newSkills);
        }
      );
      alert("Agregó un nuevo item a la lista de Habilidades");
    } else {
      this.datosPortfolio.modificarHabilidad(skills).subscribe(
        () => {
          this.reloadData();
        }
      )
      alert("Modificó un item de la lista de Habilidades");
    }

  }

}

