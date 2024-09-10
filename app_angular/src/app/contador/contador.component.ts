import { Component } from '@angular/core';
import { Persona } from './persona';
@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.scss'
})
export class ContadorComponent {
incrementar_edad() {
  this.persona.edad ++;
}
  persona:Persona={
    nombre: "Luis",
    edad: 34
  }
  numero:number=1;
  decrementar(){
    this.numero--;
  }
  incrementar(){
    this.numero++;
  }
}
