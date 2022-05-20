import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../data/Persona';
import { Experience } from '../data/Experience';
import { Education } from '../data/Education';
import { config } from '../data/config/Config';
import { Skills } from '../data/Skills';



@Injectable({
  providedIn: 'root'
})

export class PortfolioService {

  /*private url:string="http://localhost:8080/ver/persona/";*/

  constructor(private http:HttpClient) { }

  //--------------------Metodos para About(Persona):------------------------------
  obtenerDatosPersona():Observable<Persona[]>{
    return this.http.get<Persona[]>(config.baseUrl + "persona/watch/");
  }

        //NO UTILIZO CREAR PERSONA

  modificarPersona(persona: Persona): Observable<any> {
    return this.http.put<any>(config.baseUrl + "persona/update", persona);
  }

        //NO UTILIZO BORRAR PERSONA

  //--------------------Fin de Metodos para Persona:-------------------------------




  //--------------------Metodos para Education:------------------------------
  obtenerDatosEducacion():Observable<Education[]>{
    return this.http.get<Education[]>(config.baseUrl + "education/watch");
  }
  
  guardarNuevaEducacion(education:Education): Observable<Education> {
    return this.http.post<any>(config.baseUrl + "education/create", education);
  }

  modificarEducacion(education: Education): Observable<any> {
    return this.http.put<any>(config.baseUrl + "education/update", education);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "education/delete/" + id);
  }
  //--------------------Fin de Metodos para Education:-----------------------



//--------------------Metodos para Experience:------------------------------
obtenerDatosExperiencia():Observable<Experience[]>{
  return this.http.get<Experience[]>(config.baseUrl + "experience/watch");
}

guardarNuevaExperiencia(experience:Experience): Observable<Experience> {
  return this.http.post<any>(config.baseUrl + "experience/create", experience);
}

modificarExperiencia(experience: Experience): Observable<any> {
  return this.http.put<any>(config.baseUrl + "experience/update", experience);
}

borrarExperiencia(id: number): Observable<any> {
  return this.http.delete<any>(config.baseUrl + "experience/delete/" + id);
}
//--------------------Fin de Metodos para Experience:------------------------------



//--------------------Metodos para Skills:------------------------------
obtenerDatosHabilidad():Observable<Skills[]>{
  return this.http.get<Skills[]>(config.baseUrl + "skills/watch");
}

guardarNuevaHabilidad(skills:Skills): Observable<Skills> {
  return this.http.post<any>(config.baseUrl + "skills/create", skills);
}

modificarHabilidad(skills: Skills): Observable<any> {
  return this.http.put<any>(config.baseUrl + "skills/update", skills);
}

borrarHabilidad(id: number): Observable<any> {
  return this.http.delete<any>(config.baseUrl + "skills/delete/" + id);
}
//--------------------Fin de Metodos para Skills:-----------------------



}
